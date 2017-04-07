import { AuthInfoStorage } from '../../auth';
import { AppConfig } from '../../../app.config';

// tslint:disable-next-line:interface-over-type-literal
type clientMethods = { [methodName: string]: (...params) => void };

export abstract class SignalrHub {
    private hub: any;
    private isConnected = false;
    private waitingActions: (() => void)[] = [];

    constructor(
        authInfoStorage: AuthInfoStorage,
        config: AppConfig,
        hubName: string,
        clientMethods: clientMethods
    ) {
        if (window['$'] === undefined || window['$'].hubConnection === undefined) {
            throw new Error(`The variable $ or the .hubConnection() function are not defined...
                please check the SignalR scripts have been loaded properly`);
        }

        this.hub = $.connection[hubName];
        $.connection.hub.url = `${config.server}/signalr`;
        $.connection.hub.qs = { 'access_token': authInfoStorage.authInfo.token };

        this.registerClientMethods(clientMethods);

        console.log(`${hubName} connecting`);
        $.connection.hub.start().done(() => {
            this.onConnected();
            console.log(`${hubName} connected`);
        });
    }

    public dispose() {
        console.log('hub dispose');
        $.connection.hub.stop();
    }

    protected registerClientMethods(clientMethods: clientMethods) {
        for (const methodName in clientMethods) {
            this.hub.client[methodName] = clientMethods[methodName];
        }
    }

    // Server actions will be here
    protected callServerMethod(methodName: string, ...params) {
        this.doWhenConnected(() => {
            this.hub.server[methodName].apply(this, params);
        });
    }

    private doWhenConnected(action: () => void) {
        if (this.isConnected) {
            action();
        } else {
            this.waitingActions.push(action);
        }
    }

    private onConnected() {
        this.isConnected = true;
        for (const action of this.waitingActions) {
            setTimeout(action, 0);
        }

        this.waitingActions = [];
    }
}
