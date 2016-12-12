webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(21);
	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(22);
	__webpack_require__(32);
	__webpack_require__(33);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0
	
	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.
	
	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	var Reflect;
	(function (Reflect) {
	    "use strict";
	    var hasOwn = Object.prototype.hasOwnProperty;
	    // feature test for Object.create support
	    var supportsCreate = typeof Object.create === "function";
	    // feature test for __proto__ support
	    var supportsProto = (function () {
	        var sentinel = {};
	        function __() { }
	        __.prototype = sentinel;
	        var instance = new __();
	        return instance.__proto__ === sentinel;
	    })();
	    // create an object in dictionary mode (a.k.a. "slow" mode in v8)
	    var createDictionary = supportsCreate ? function () { return MakeDictionary(Object.create(null)); } :
	        supportsProto ? function () { return MakeDictionary({ __proto__: null }); } :
	            function () { return MakeDictionary({}); };
	    var HashMap;
	    (function (HashMap) {
	        var downLevel = !supportsCreate && !supportsProto;
	        HashMap.has = downLevel
	            ? function (map, key) { return hasOwn.call(map, key); }
	            : function (map, key) { return key in map; };
	        HashMap.get = downLevel
	            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
	            : function (map, key) { return map[key]; };
	    })(HashMap || (HashMap = {}));
	    // Load global or shim versions of Map, Set, and WeakMap
	    var functionPrototype = Object.getPrototypeOf(Function);
	    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
	    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
	    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	    // [[Metadata]] internal slot
	    var Metadata = new _WeakMap();
	    /**
	      * Applies a set of decorators to a property of a target object.
	      * @param decorators An array of decorators.
	      * @param target The target object.
	      * @param targetKey (Optional) The property key to decorate.
	      * @param targetDescriptor (Optional) The property descriptor for the target key
	      * @remarks Decorators are applied in reverse order.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Example = Reflect.decorate(decoratorsArray, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Object.defineProperty(Example, "staticMethod",
	      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
	      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
	      *
	      *     // method (on prototype)
	      *     Object.defineProperty(Example.prototype, "method",
	      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
	      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
	      *
	      */
	    function decorate(decorators, target, targetKey, targetDescriptor) {
	        if (!IsUndefined(targetDescriptor)) {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsObject(target))
	                throw new TypeError();
	            if (IsUndefined(targetKey))
	                throw new TypeError();
	            if (!IsObject(targetDescriptor))
	                throw new TypeError();
	            targetKey = ToPropertyKey(targetKey);
	            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
	        }
	        else if (!IsUndefined(targetKey)) {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsObject(target))
	                throw new TypeError();
	            targetKey = ToPropertyKey(targetKey);
	            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
	        }
	        else {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsConstructor(target))
	                throw new TypeError();
	            return DecorateConstructor(decorators, target);
	        }
	    }
	    Reflect.decorate = decorate;
	    /**
	      * A default metadata decorator factory that can be used on a class, class member, or parameter.
	      * @param metadataKey The key for the metadata entry.
	      * @param metadataValue The value for the metadata entry.
	      * @returns A decorator function.
	      * @remarks
	      * If `metadataKey` is already defined for the target and target key, the
	      * metadataValue for that key will be overwritten.
	      * @example
	      *
	      *     // constructor
	      *     @Reflect.metadata(key, value)
	      *     class Example {
	      *     }
	      *
	      *     // property (on constructor, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticProperty;
	      *     }
	      *
	      *     // property (on prototype, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         property;
	      *     }
	      *
	      *     // method (on constructor)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticMethod() { }
	      *     }
	      *
	      *     // method (on prototype)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         method() { }
	      *     }
	      *
	      */
	    function metadata(metadataKey, metadataValue) {
	        function decorator(target, targetKey) {
	            if (!IsUndefined(targetKey)) {
	                if (!IsObject(target))
	                    throw new TypeError();
	                targetKey = ToPropertyKey(targetKey);
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	            }
	            else {
	                if (!IsConstructor(target))
	                    throw new TypeError();
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, /*targetKey*/ undefined);
	            }
	        }
	        return decorator;
	    }
	    Reflect.metadata = metadata;
	    /**
	      * Define a unique metadata entry on the target.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param metadataValue A value that contains attached metadata.
	      * @param target The target object on which to define metadata.
	      * @param targetKey (Optional) The property key for the target.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Reflect.defineMetadata("custom:annotation", options, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
	      *
	      *     // decorator factory as metadata-producing annotation.
	      *     function MyAnnotation(options): Decorator {
	      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	      *     }
	      *
	      */
	    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	    }
	    Reflect.defineMetadata = defineMetadata;
	    /**
	      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryHasMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.hasMetadata = hasMetadata;
	    /**
	      * Gets a value indicating whether the target object has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasOwnMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.hasOwnMetadata = hasOwnMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryGetMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.getMetadata = getMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getOwnMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.getOwnMetadata = getOwnMetadata;
	    /**
	      * Gets the metadata keys defined on the target object or its prototype chain.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getMetadataKeys(target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryMetadataKeys(target, targetKey);
	    }
	    Reflect.getMetadataKeys = getMetadataKeys;
	    /**
	      * Gets the unique metadata keys defined on the target object.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getOwnMetadataKeys(target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryOwnMetadataKeys(target, targetKey);
	    }
	    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
	    /**
	      * Deletes the metadata entry from the target object with the provided key.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.deleteMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function deleteMetadata(metadataKey, target, targetKey) {
	        // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#deletemetadata-metadatakey-p-
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
	        if (IsUndefined(metadataMap))
	            return false;
	        if (!metadataMap.delete(metadataKey))
	            return false;
	        if (metadataMap.size > 0)
	            return true;
	        var targetMetadata = Metadata.get(target);
	        targetMetadata.delete(targetKey);
	        if (targetMetadata.size > 0)
	            return true;
	        Metadata.delete(target);
	        return true;
	    }
	    Reflect.deleteMetadata = deleteMetadata;
	    function DecorateConstructor(decorators, target) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target);
	            if (!IsUndefined(decorated)) {
	                if (!IsConstructor(decorated))
	                    throw new TypeError();
	                target = decorated;
	            }
	        }
	        return target;
	    }
	    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target, propertyKey, descriptor);
	            if (!IsUndefined(decorated)) {
	                if (!IsObject(decorated))
	                    throw new TypeError();
	                descriptor = decorated;
	            }
	        }
	        return descriptor;
	    }
	    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            decorator(target, propertyKey);
	        }
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#getorcreatemetadatamap--o-p-create-
	    function GetOrCreateMetadataMap(target, targetKey, create) {
	        var targetMetadata = Metadata.get(target);
	        if (!targetMetadata) {
	            if (!create)
	                return undefined;
	            targetMetadata = new _Map();
	            Metadata.set(target, targetMetadata);
	        }
	        var keyMetadata = targetMetadata.get(targetKey);
	        if (!keyMetadata) {
	            if (!create)
	                return undefined;
	            keyMetadata = new _Map();
	            targetMetadata.set(targetKey, keyMetadata);
	        }
	        return keyMetadata;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
	    function OrdinaryHasMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return true;
	        var parent = GetPrototypeOf(O);
	        return parent !== null ? OrdinaryHasMetadata(MetadataKey, parent, P) : false;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
	    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
	        return metadataMap !== undefined && Boolean(metadataMap.has(MetadataKey));
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetmetadata--metadatakey-o-p-
	    function OrdinaryGetMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	        var parent = GetPrototypeOf(O);
	        return parent !== null ? OrdinaryGetMetadata(MetadataKey, parent, P) : undefined;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
	    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
	        return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
	    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ true);
	        metadataMap.set(MetadataKey, MetadataValue);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarymetadatakeys--o-p-
	    function OrdinaryMetadataKeys(O, P) {
	        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	        var parent = GetPrototypeOf(O);
	        if (parent === null)
	            return ownKeys;
	        var parentKeys = OrdinaryMetadataKeys(parent, P);
	        if (parentKeys.length <= 0)
	            return ownKeys;
	        if (ownKeys.length <= 0)
	            return parentKeys;
	        var keys = new _Set();
	        for (var _i = 0; _i < ownKeys.length; _i++) {
	            var key = ownKeys[_i];
	            keys.add(key);
	        }
	        for (var _a = 0; _a < parentKeys.length; _a++) {
	            var key = parentKeys[_a];
	            keys.add(key);
	        }
	        return getKeys(keys);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryownmetadatakeys--o-p-
	    function OrdinaryOwnMetadataKeys(target, targetKey) {
	        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
	        var keys = [];
	        if (metadataMap)
	            forEach(metadataMap, function (_, key) { return keys.push(key); });
	        return keys;
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
	    function IsUndefined(x) {
	        return x === undefined;
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	    function IsArray(x) {
	        return Array.isArray ? Array.isArray(x) : x instanceof Array || Object.prototype.toString.call(x) === "[object Array]";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
	    function IsObject(x) {
	        return typeof x === "object" ? x !== null : typeof x === "function";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	    function IsConstructor(x) {
	        return typeof x === "function";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
	    function IsSymbol(x) {
	        return typeof x === "symbol";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	    function ToPropertyKey(value) {
	        return IsSymbol(value) ? value : String(value);
	    }
	    function GetPrototypeOf(O) {
	        var proto = Object.getPrototypeOf(O);
	        if (typeof O !== "function" || O === functionPrototype)
	            return proto;
	        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
	        // Try to determine the superclass Exampleonstructor. Compatible implementations
	        // must either set __proto__ on a subclass Exampleonstructor to the superclass Exampleonstructor,
	        // or ensure each class has a valid `constructor` property on its prototype that
	        // points back to the constructor.
	        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	        // This is the case when in ES6 or when using __proto__ in a compatible browser.
	        if (proto !== functionPrototype)
	            return proto;
	        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	        var prototype = O.prototype;
	        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	        if (prototypeProto == null || prototypeProto === Object.prototype)
	            return proto;
	        // If the constructor was not a function, then we cannot determine the heritage.
	        var constructor = prototypeProto.constructor;
	        if (typeof constructor !== "function")
	            return proto;
	        // If we have some kind of self-reference, then we cannot determine the heritage.
	        if (constructor === O)
	            return proto;
	        // we have a pretty good guess at the heritage.
	        return constructor;
	    }
	    function IteratorStep(iterator) {
	        var result = iterator.next();
	        return result.done ? undefined : result;
	    }
	    function IteratorClose(iterator) {
	        var f = iterator["return"];
	        if (f)
	            f.call(iterator);
	    }
	    function forEach(source, callback, thisArg) {
	        var entries = source.entries;
	        if (typeof entries === "function") {
	            var iterator = entries.call(source);
	            var result;
	            try {
	                while (result = IteratorStep(iterator)) {
	                    var _a = result.value, key = _a[0], value = _a[1];
	                    callback.call(thisArg, value, key, source);
	                }
	            }
	            finally {
	                if (result)
	                    IteratorClose(iterator);
	            }
	        }
	        else {
	            var forEach_1 = source.forEach;
	            if (typeof forEach_1 === "function") {
	                forEach_1.call(source, callback, thisArg);
	            }
	        }
	    }
	    function getKeys(source) {
	        var keys = [];
	        forEach(source, function (_, key) { keys.push(key); });
	        return keys;
	    }
	    // naive MapIterator shim
	    function CreateMapIterator(keys, values, kind) {
	        var index = 0;
	        return {
	            next: function () {
	                if ((keys || values) && index < (keys || values).length) {
	                    var current = index++;
	                    switch (kind) {
	                        case "key": return { value: keys[current], done: false };
	                        case "value": return { value: values[current], done: false };
	                        case "key+value": return { value: [keys[current], values[current]], done: false };
	                    }
	                }
	                keys = undefined;
	                values = undefined;
	                return { value: undefined, done: true };
	            },
	            "throw": function (error) {
	                if (keys || values) {
	                    keys = undefined;
	                    values = undefined;
	                }
	                throw error;
	            },
	            "return": function (value) {
	                if (keys || values) {
	                    keys = undefined;
	                    values = undefined;
	                }
	                return { value: value, done: true };
	            }
	        };
	    }
	    // naive Map shim
	    function CreateMapPolyfill() {
	        var cacheSentinel = {};
	        return (function () {
	            function Map() {
	                this._keys = [];
	                this._values = [];
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            }
	            Object.defineProperty(Map.prototype, "size", {
	                get: function () { return this._keys.length; },
	                enumerable: true,
	                configurable: true
	            });
	            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
	            Map.prototype.get = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                return index >= 0 ? this._values[index] : undefined;
	            };
	            Map.prototype.set = function (key, value) {
	                var index = this._find(key, /*insert*/ true);
	                this._values[index] = value;
	                return this;
	            };
	            Map.prototype.delete = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                if (index >= 0) {
	                    var size = this._keys.length;
	                    for (var i = index + 1; i < size; i++) {
	                        this._keys[i - 1] = this._keys[i];
	                        this._values[i - 1] = this._values[i];
	                    }
	                    this._keys.length--;
	                    this._values.length--;
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                    return true;
	                }
	                return false;
	            };
	            Map.prototype.clear = function () {
	                this._keys.length = 0;
	                this._values.length = 0;
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            };
	            Map.prototype.keys = function () { return CreateMapIterator(this._keys, /*values*/ undefined, "key"); };
	            Map.prototype.values = function () { return CreateMapIterator(/*keys*/ undefined, this._values, "value"); };
	            Map.prototype.entries = function () { return CreateMapIterator(this._keys, this._values, "key+value"); };
	            Map.prototype._find = function (key, insert) {
	                if (this._cacheKey === key)
	                    return this._cacheIndex;
	                var index = this._keys.indexOf(key);
	                if (index < 0 && insert) {
	                    index = this._keys.length;
	                    this._keys.push(key);
	                    this._values.push(undefined);
	                }
	                return this._cacheKey = key, this._cacheIndex = index;
	            };
	            return Map;
	        })();
	    }
	    // naive Set shim
	    function CreateSetPolyfill() {
	        return (function () {
	            function Set() {
	                this._map = new _Map();
	            }
	            Object.defineProperty(Set.prototype, "size", {
	                get: function () { return this._map.size; },
	                enumerable: true,
	                configurable: true
	            });
	            Set.prototype.has = function (value) { return this._map.has(value); };
	            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
	            Set.prototype.delete = function (value) { return this._map.delete(value); };
	            Set.prototype.clear = function () { this._map.clear(); };
	            Set.prototype.keys = function () { return this._map.keys(); };
	            Set.prototype.values = function () { return this._map.values(); };
	            Set.prototype.entries = function () { return this._map.entries(); };
	            return Set;
	        })();
	    }
	    // naive WeakMap shim
	    function CreateWeakMapPolyfill() {
	        var UUID_SIZE = 16;
	        var keys = createDictionary();
	        var rootKey = CreateUniqueKey();
	        return (function () {
	            function WeakMap() {
	                this._key = CreateUniqueKey();
	            }
	            WeakMap.prototype.has = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.has(table, this._key) : false;
	            };
	            WeakMap.prototype.get = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.get(table, this._key) : undefined;
	            };
	            WeakMap.prototype.set = function (target, value) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
	                table[this._key] = value;
	                return this;
	            };
	            WeakMap.prototype.delete = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? delete table[this._key] : false;
	            };
	            WeakMap.prototype.clear = function () {
	                // NOTE: not a real clear, just makes the previous data unreachable
	                this._key = CreateUniqueKey();
	            };
	            return WeakMap;
	        })();
	        function FillRandomBytes(buffer, size) {
	            for (var i = 0; i < size; ++i)
	                buffer[i] = Math.random() * 0xff | 0;
	            return buffer;
	        }
	        function GenRandomBytes(size) {
	            if (typeof Uint8Array === "function") {
	                if (typeof crypto !== "undefined")
	                    return crypto.getRandomValues(new Uint8Array(size));
	                if (typeof msCrypto !== "undefined")
	                    return msCrypto.getRandomValues(new Uint8Array(size));
	                return FillRandomBytes(new Uint8Array(size), size);
	            }
	            return FillRandomBytes(new Array(size), size);
	        }
	        function CreateUUID() {
	            var data = GenRandomBytes(UUID_SIZE);
	            // mark as random - RFC 4122 § 4.4
	            data[6] = data[6] & 0x4f | 0x40;
	            data[8] = data[8] & 0xbf | 0x80;
	            var result = "";
	            for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                var byte = data[offset];
	                if (offset === 4 || offset === 6 || offset === 8)
	                    result += "-";
	                if (byte < 16)
	                    result += "0";
	                result += byte.toString(16).toLowerCase();
	            }
	            return result;
	        }
	        function CreateUniqueKey() {
	            var key;
	            do
	                key = "@@WeakMap@@" + CreateUUID();
	            while (HashMap.has(keys, key));
	            keys[key] = true;
	            return key;
	        }
	        function GetOrCreateWeakMapTable(target, create) {
	            if (!hasOwn.call(target, rootKey)) {
	                if (!create)
	                    return undefined;
	                Object.defineProperty(target, rootKey, { value: createDictionary() });
	            }
	            return target[rootKey];
	        }
	    }
	    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
	    function MakeDictionary(obj) {
	        obj.__DICTIONARY_MODE__ = 1;
	        delete obj.____DICTIONARY_MODE__;
	        return obj;
	    }
	    // patch global Reflect
	    (function (__global) {
	        if (typeof __global.Reflect !== "undefined") {
	            if (__global.Reflect !== Reflect) {
	                for (var p in Reflect) {
	                    if (hasOwn.call(Reflect, p)) {
	                        __global.Reflect[p] = Reflect[p];
	                    }
	                }
	            }
	        }
	        else {
	            __global.Reflect = Reflect;
	        }
	    })(typeof window !== "undefined" ? window :
	        typeof WorkerGlobalScope !== "undefined" ? self :
	            typeof global !== "undefined" ? global :
	                Function("return this;")());
	})(Reflect || (Reflect = {}));
	//# sourceMappingURL=Reflect.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	* @license
	* Copyright Google Inc. All Rights Reserved.
	*
	* Use of this source code is governed by an MIT-style license that can be
	* found in the LICENSE file at https://angular.io/license
	*/
	(function (global, factory) {
	     true ? factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (factory());
	}(this, (function () { 'use strict';
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	
	
	var Zone$1 = (function (global) {
	    if (global.Zone) {
	        throw new Error('Zone already loaded.');
	    }
	    var Zone = (function () {
	        function Zone(parent, zoneSpec) {
	            this._properties = null;
	            this._parent = parent;
	            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
	            this._properties = zoneSpec && zoneSpec.properties || {};
	            this._zoneDelegate =
	                new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
	        }
	        Zone.assertZonePatched = function () {
	            if (global.Promise !== ZoneAwarePromise) {
	                throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
	                    'has been overwritten.\n' +
	                    'Most likely cause is that a Promise polyfill has been loaded ' +
	                    'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
	                    'If you must load one, do so before loading zone.js.)');
	            }
	        };
	        Object.defineProperty(Zone, "current", {
	            get: function () {
	                return _currentZoneFrame.zone;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        
	        Object.defineProperty(Zone, "currentTask", {
	            get: function () {
	                return _currentTask;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        
	        Object.defineProperty(Zone.prototype, "parent", {
	            get: function () {
	                return this._parent;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        
	        Object.defineProperty(Zone.prototype, "name", {
	            get: function () {
	                return this._name;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        
	        Zone.prototype.get = function (key) {
	            var zone = this.getZoneWith(key);
	            if (zone)
	                return zone._properties[key];
	        };
	        Zone.prototype.getZoneWith = function (key) {
	            var current = this;
	            while (current) {
	                if (current._properties.hasOwnProperty(key)) {
	                    return current;
	                }
	                current = current._parent;
	            }
	            return null;
	        };
	        Zone.prototype.fork = function (zoneSpec) {
	            if (!zoneSpec)
	                throw new Error('ZoneSpec required!');
	            return this._zoneDelegate.fork(this, zoneSpec);
	        };
	        Zone.prototype.wrap = function (callback, source) {
	            if (typeof callback !== 'function') {
	                throw new Error('Expecting function got: ' + callback);
	            }
	            var _callback = this._zoneDelegate.intercept(this, callback, source);
	            var zone = this;
	            return function () {
	                return zone.runGuarded(_callback, this, arguments, source);
	            };
	        };
	        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
	            if (applyThis === void 0) { applyThis = null; }
	            if (applyArgs === void 0) { applyArgs = null; }
	            if (source === void 0) { source = null; }
	            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
	            try {
	                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
	            }
	            finally {
	                _currentZoneFrame = _currentZoneFrame.parent;
	            }
	        };
	        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
	            if (applyThis === void 0) { applyThis = null; }
	            if (applyArgs === void 0) { applyArgs = null; }
	            if (source === void 0) { source = null; }
	            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
	            try {
	                try {
	                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
	                }
	                catch (error) {
	                    if (this._zoneDelegate.handleError(this, error)) {
	                        throw error;
	                    }
	                }
	            }
	            finally {
	                _currentZoneFrame = _currentZoneFrame.parent;
	            }
	        };
	        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
	            task.runCount++;
	            if (task.zone != this)
	                throw new Error('A task can only be run in the zone which created it! (Creation: ' + task.zone.name +
	                    '; Execution: ' + this.name + ')');
	            var previousTask = _currentTask;
	            _currentTask = task;
	            _currentZoneFrame = new ZoneFrame(_currentZoneFrame, this);
	            try {
	                if (task.type == 'macroTask' && task.data && !task.data.isPeriodic) {
	                    task.cancelFn = null;
	                }
	                try {
	                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
	                }
	                catch (error) {
	                    if (this._zoneDelegate.handleError(this, error)) {
	                        throw error;
	                    }
	                }
	            }
	            finally {
	                _currentZoneFrame = _currentZoneFrame.parent;
	                _currentTask = previousTask;
	            }
	        };
	        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
	            return this._zoneDelegate.scheduleTask(this, new ZoneTask('microTask', this, source, callback, data, customSchedule, null));
	        };
	        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
	            return this._zoneDelegate.scheduleTask(this, new ZoneTask('macroTask', this, source, callback, data, customSchedule, customCancel));
	        };
	        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
	            return this._zoneDelegate.scheduleTask(this, new ZoneTask('eventTask', this, source, callback, data, customSchedule, customCancel));
	        };
	        Zone.prototype.cancelTask = function (task) {
	            var value = this._zoneDelegate.cancelTask(this, task);
	            task.runCount = -1;
	            task.cancelFn = null;
	            return value;
	        };
	        Zone.__symbol__ = __symbol__;
	        return Zone;
	    }());
	    
	    var ZoneDelegate = (function () {
	        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
	            this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 };
	            this.zone = zone;
	            this._parentDelegate = parentDelegate;
	            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
	            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
	            this._interceptZS =
	                zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
	            this._interceptDlgt =
	                zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
	            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
	            this._invokeDlgt =
	                zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
	            this._handleErrorZS =
	                zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
	            this._handleErrorDlgt =
	                zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
	            this._scheduleTaskZS =
	                zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
	            this._scheduleTaskDlgt =
	                zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
	            this._invokeTaskZS =
	                zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
	            this._invokeTaskDlgt =
	                zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
	            this._cancelTaskZS =
	                zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
	            this._cancelTaskDlgt =
	                zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
	            this._hasTaskZS = zoneSpec && (zoneSpec.onHasTask ? zoneSpec : parentDelegate._hasTaskZS);
	            this._hasTaskDlgt =
	                zoneSpec && (zoneSpec.onHasTask ? parentDelegate : parentDelegate._hasTaskDlgt);
	        }
	        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
	            return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
	                new Zone(targetZone, zoneSpec);
	        };
	        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
	            return this._interceptZS ?
	                this._interceptZS.onIntercept(this._interceptDlgt, this.zone, targetZone, callback, source) :
	                callback;
	        };
	        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
	            return this._invokeZS ?
	                this._invokeZS.onInvoke(this._invokeDlgt, this.zone, targetZone, callback, applyThis, applyArgs, source) :
	                callback.apply(applyThis, applyArgs);
	        };
	        ZoneDelegate.prototype.handleError = function (targetZone, error) {
	            return this._handleErrorZS ?
	                this._handleErrorZS.onHandleError(this._handleErrorDlgt, this.zone, targetZone, error) :
	                true;
	        };
	        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
	            try {
	                if (this._scheduleTaskZS) {
	                    return this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this.zone, targetZone, task);
	                }
	                else if (task.scheduleFn) {
	                    task.scheduleFn(task);
	                }
	                else if (task.type == 'microTask') {
	                    scheduleMicroTask(task);
	                }
	                else {
	                    throw new Error('Task is missing scheduleFn.');
	                }
	                return task;
	            }
	            finally {
	                if (targetZone == this.zone) {
	                    this._updateTaskCount(task.type, 1);
	                }
	            }
	        };
	        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
	            try {
	                return this._invokeTaskZS ?
	                    this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this.zone, targetZone, task, applyThis, applyArgs) :
	                    task.callback.apply(applyThis, applyArgs);
	            }
	            finally {
	                if (targetZone == this.zone && (task.type != 'eventTask') &&
	                    !(task.data && task.data.isPeriodic)) {
	                    this._updateTaskCount(task.type, -1);
	                }
	            }
	        };
	        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
	            var value;
	            if (this._cancelTaskZS) {
	                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this.zone, targetZone, task);
	            }
	            else if (!task.cancelFn) {
	                throw new Error('Task does not support cancellation, or is already canceled.');
	            }
	            else {
	                value = task.cancelFn(task);
	            }
	            if (targetZone == this.zone) {
	                // this should not be in the finally block, because exceptions assume not canceled.
	                this._updateTaskCount(task.type, -1);
	            }
	            return value;
	        };
	        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
	            return this._hasTaskZS &&
	                this._hasTaskZS.onHasTask(this._hasTaskDlgt, this.zone, targetZone, isEmpty);
	        };
	        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
	            var counts = this._taskCounts;
	            var prev = counts[type];
	            var next = counts[type] = prev + count;
	            if (next < 0) {
	                throw new Error('More tasks executed then were scheduled.');
	            }
	            if (prev == 0 || next == 0) {
	                var isEmpty = {
	                    microTask: counts.microTask > 0,
	                    macroTask: counts.macroTask > 0,
	                    eventTask: counts.eventTask > 0,
	                    change: type
	                };
	                try {
	                    this.hasTask(this.zone, isEmpty);
	                }
	                finally {
	                    if (this._parentDelegate) {
	                        this._parentDelegate._updateTaskCount(type, count);
	                    }
	                }
	            }
	        };
	        return ZoneDelegate;
	    }());
	    var ZoneTask = (function () {
	        function ZoneTask(type, zone, source, callback, options, scheduleFn, cancelFn) {
	            this.runCount = 0;
	            this.type = type;
	            this.zone = zone;
	            this.source = source;
	            this.data = options;
	            this.scheduleFn = scheduleFn;
	            this.cancelFn = cancelFn;
	            this.callback = callback;
	            var self = this;
	            this.invoke = function () {
	                _numberOfNestedTaskFrames++;
	                try {
	                    return zone.runTask(self, this, arguments);
	                }
	                finally {
	                    if (_numberOfNestedTaskFrames == 1) {
	                        drainMicroTaskQueue();
	                    }
	                    _numberOfNestedTaskFrames--;
	                }
	            };
	        }
	        ZoneTask.prototype.toString = function () {
	            if (this.data && typeof this.data.handleId !== 'undefined') {
	                return this.data.handleId;
	            }
	            else {
	                return Object.prototype.toString.call(this);
	            }
	        };
	        return ZoneTask;
	    }());
	    var ZoneFrame = (function () {
	        function ZoneFrame(parent, zone) {
	            this.parent = parent;
	            this.zone = zone;
	        }
	        return ZoneFrame;
	    }());
	    function __symbol__(name) {
	        return '__zone_symbol__' + name;
	    }
	    
	    var symbolSetTimeout = __symbol__('setTimeout');
	    var symbolPromise = __symbol__('Promise');
	    var symbolThen = __symbol__('then');
	    var _currentZoneFrame = new ZoneFrame(null, new Zone(null, null));
	    var _currentTask = null;
	    var _microTaskQueue = [];
	    var _isDrainingMicrotaskQueue = false;
	    var _uncaughtPromiseErrors = [];
	    var _numberOfNestedTaskFrames = 0;
	    function scheduleQueueDrain() {
	        // if we are not running in any task, and there has not been anything scheduled
	        // we must bootstrap the initial task creation by manually scheduling the drain
	        if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
	            // We are not running in Task, so we need to kickstart the microtask queue.
	            if (global[symbolPromise]) {
	                global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
	            }
	            else {
	                global[symbolSetTimeout](drainMicroTaskQueue, 0);
	            }
	        }
	    }
	    function scheduleMicroTask(task) {
	        scheduleQueueDrain();
	        _microTaskQueue.push(task);
	    }
	    function consoleError(e) {
	        var rejection = e && e.rejection;
	        if (rejection) {
	            console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
	        }
	        console.error(e);
	    }
	    function drainMicroTaskQueue() {
	        if (!_isDrainingMicrotaskQueue) {
	            _isDrainingMicrotaskQueue = true;
	            while (_microTaskQueue.length) {
	                var queue = _microTaskQueue;
	                _microTaskQueue = [];
	                for (var i = 0; i < queue.length; i++) {
	                    var task = queue[i];
	                    try {
	                        task.zone.runTask(task, null, null);
	                    }
	                    catch (e) {
	                        consoleError(e);
	                    }
	                }
	            }
	            while (_uncaughtPromiseErrors.length) {
	                var _loop_1 = function() {
	                    var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
	                    try {
	                        uncaughtPromiseError.zone.runGuarded(function () {
	                            throw uncaughtPromiseError;
	                        });
	                    }
	                    catch (e) {
	                        consoleError(e);
	                    }
	                };
	                while (_uncaughtPromiseErrors.length) {
	                    _loop_1();
	                }
	            }
	            _isDrainingMicrotaskQueue = false;
	        }
	    }
	    function isThenable(value) {
	        return value && value.then;
	    }
	    function forwardResolution(value) {
	        return value;
	    }
	    function forwardRejection(rejection) {
	        return ZoneAwarePromise.reject(rejection);
	    }
	    var symbolState = __symbol__('state');
	    var symbolValue = __symbol__('value');
	    var source = 'Promise.then';
	    var UNRESOLVED = null;
	    var RESOLVED = true;
	    var REJECTED = false;
	    var REJECTED_NO_CATCH = 0;
	    function makeResolver(promise, state) {
	        return function (v) {
	            resolvePromise(promise, state, v);
	            // Do not return value or you will break the Promise spec.
	        };
	    }
	    function resolvePromise(promise, state, value) {
	        if (promise[symbolState] === UNRESOLVED) {
	            if (value instanceof ZoneAwarePromise &&
	                value.hasOwnProperty(symbolState) &&
	                value.hasOwnProperty(symbolValue) &&
	                value[symbolState] !== UNRESOLVED) {
	                clearRejectedNoCatch(value);
	                resolvePromise(promise, value[symbolState], value[symbolValue]);
	            }
	            else if (isThenable(value)) {
	                value.then(makeResolver(promise, state), makeResolver(promise, false));
	            }
	            else {
	                promise[symbolState] = state;
	                var queue = promise[symbolValue];
	                promise[symbolValue] = value;
	                for (var i = 0; i < queue.length;) {
	                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
	                }
	                if (queue.length == 0 && state == REJECTED) {
	                    promise[symbolState] = REJECTED_NO_CATCH;
	                    try {
	                        throw new Error('Uncaught (in promise): ' + value +
	                            (value && value.stack ? '\n' + value.stack : ''));
	                    }
	                    catch (e) {
	                        var error_1 = e;
	                        error_1.rejection = value;
	                        error_1.promise = promise;
	                        error_1.zone = Zone.current;
	                        error_1.task = Zone.currentTask;
	                        _uncaughtPromiseErrors.push(error_1);
	                        scheduleQueueDrain();
	                    }
	                }
	            }
	        }
	        // Resolving an already resolved promise is a noop.
	        return promise;
	    }
	    function clearRejectedNoCatch(promise) {
	        if (promise[symbolState] === REJECTED_NO_CATCH) {
	            promise[symbolState] = REJECTED;
	            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
	                if (promise === _uncaughtPromiseErrors[i].promise) {
	                    _uncaughtPromiseErrors.splice(i, 1);
	                    break;
	                }
	            }
	        }
	    }
	    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
	        clearRejectedNoCatch(promise);
	        var delegate = promise[symbolState] ? onFulfilled || forwardResolution : onRejected || forwardRejection;
	        zone.scheduleMicroTask(source, function () {
	            try {
	                resolvePromise(chainPromise, true, zone.run(delegate, null, [promise[symbolValue]]));
	            }
	            catch (error) {
	                resolvePromise(chainPromise, false, error);
	            }
	        });
	    }
	    var ZoneAwarePromise = (function () {
	        function ZoneAwarePromise(executor) {
	            var promise = this;
	            if (!(promise instanceof ZoneAwarePromise)) {
	                throw new Error('Must be an instanceof Promise.');
	            }
	            promise[symbolState] = UNRESOLVED;
	            promise[symbolValue] = []; // queue;
	            try {
	                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
	            }
	            catch (e) {
	                resolvePromise(promise, false, e);
	            }
	        }
	        ZoneAwarePromise.resolve = function (value) {
	            return resolvePromise(new this(null), RESOLVED, value);
	        };
	        ZoneAwarePromise.reject = function (error) {
	            return resolvePromise(new this(null), REJECTED, error);
	        };
	        ZoneAwarePromise.race = function (values) {
	            var resolve;
	            var reject;
	            var promise = new this(function (res, rej) {
	                _a = [res, rej], resolve = _a[0], reject = _a[1];
	                var _a;
	            });
	            function onResolve(value) {
	                promise && (promise = null || resolve(value));
	            }
	            function onReject(error) {
	                promise && (promise = null || reject(error));
	            }
	            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
	                var value = values_1[_i];
	                if (!isThenable(value)) {
	                    value = this.resolve(value);
	                }
	                value.then(onResolve, onReject);
	            }
	            return promise;
	        };
	        ZoneAwarePromise.all = function (values) {
	            var resolve;
	            var reject;
	            var promise = new this(function (res, rej) {
	                resolve = res;
	                reject = rej;
	            });
	            var count = 0;
	            var resolvedValues = [];
	            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
	                var value = values_2[_i];
	                if (!isThenable(value)) {
	                    value = this.resolve(value);
	                }
	                value.then((function (index) { return function (value) {
	                    resolvedValues[index] = value;
	                    count--;
	                    if (!count) {
	                        resolve(resolvedValues);
	                    }
	                }; })(count), reject);
	                count++;
	            }
	            if (!count)
	                resolve(resolvedValues);
	            return promise;
	        };
	        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
	            var chainPromise = new this.constructor(null);
	            var zone = Zone.current;
	            if (this[symbolState] == UNRESOLVED) {
	                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
	            }
	            else {
	                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
	            }
	            return chainPromise;
	        };
	        ZoneAwarePromise.prototype.catch = function (onRejected) {
	            return this.then(null, onRejected);
	        };
	        return ZoneAwarePromise;
	    }());
	    // Protect against aggressive optimizers dropping seemingly unused properties.
	    // E.g. Closure Compiler in advanced mode.
	    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
	    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
	    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
	    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
	    var NativePromise = global[__symbol__('Promise')] = global.Promise;
	    global.Promise = ZoneAwarePromise;
	    function patchThen(NativePromise) {
	        var NativePromiseProtototype = NativePromise.prototype;
	        var NativePromiseThen = NativePromiseProtototype[__symbol__('then')] =
	            NativePromiseProtototype.then;
	        NativePromiseProtototype.then = function (onResolve, onReject) {
	            var nativePromise = this;
	            return new ZoneAwarePromise(function (resolve, reject) {
	                NativePromiseThen.call(nativePromise, resolve, reject);
	            })
	                .then(onResolve, onReject);
	        };
	    }
	    if (NativePromise) {
	        patchThen(NativePromise);
	        if (typeof global['fetch'] !== 'undefined') {
	            var fetchPromise = void 0;
	            try {
	                // In MS Edge this throws
	                fetchPromise = global['fetch']();
	            }
	            catch (e) {
	                // In Chrome this throws instead.
	                fetchPromise = global['fetch']('about:blank');
	            }
	            // ignore output to prevent error;
	            fetchPromise.then(function () { return null; }, function () { return null; });
	            if (fetchPromise.constructor != NativePromise &&
	                fetchPromise.constructor != ZoneAwarePromise) {
	                patchThen(fetchPromise.constructor);
	            }
	        }
	    }
	    // This is not part of public API, but it is usefull for tests, so we expose it.
	    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
	    /*
	     * This code patches Error so that:
	     *   - It ignores un-needed stack frames.
	     *   - It Shows the associated Zone for reach frame.
	     */
	    var FrameType;
	    (function (FrameType) {
	        /// Skip this frame when printing out stack
	        FrameType[FrameType["blackList"] = 0] = "blackList";
	        /// This frame marks zone transition
	        FrameType[FrameType["trasition"] = 1] = "trasition";
	    })(FrameType || (FrameType = {}));
	    
	    var NativeError = global[__symbol__('Error')] = global.Error;
	    // Store the frames which should be removed from the stack frames
	    var blackListedStackFrames = {};
	    // We must find the frame where Error was created, otherwise we assume we don't understand stack
	    var zoneAwareFrame;
	    global.Error = ZoneAwareError;
	    // How should the stack frames be parsed.
	    var frameParserStrategy = null;
	    var stackRewrite = 'stackRewrite';
	    /**
	     * This is ZoneAwareError which processes the stack frame and cleans up extra frames as well as
	     * adds zone information to it.
	     */
	    function ZoneAwareError() {
	        // Create an Error.
	        var error = NativeError.apply(this, arguments);
	        // Save original stack trace
	        error.originalStack = error.stack;
	        // Process the stack trace and rewrite the frames.
	        if (ZoneAwareError[stackRewrite] && error.originalStack) {
	            var frames_1 = error.originalStack.split('\n');
	            var zoneFrame = _currentZoneFrame;
	            var i = 0;
	            // Find the first frame
	            while (frames_1[i] !== zoneAwareFrame && i < frames_1.length) {
	                i++;
	            }
	            for (; i < frames_1.length && zoneFrame; i++) {
	                var frame = frames_1[i];
	                if (frame.trim()) {
	                    var frameType = blackListedStackFrames.hasOwnProperty(frame) && blackListedStackFrames[frame];
	                    if (frameType === FrameType.blackList) {
	                        frames_1.splice(i, 1);
	                        i--;
	                    }
	                    else if (frameType === FrameType.trasition) {
	                        if (zoneFrame.parent) {
	                            // This is the special frame where zone changed. Print and process it accordingly
	                            frames_1[i] += " [" + zoneFrame.parent.zone.name + " => " + zoneFrame.zone.name + "]";
	                            zoneFrame = zoneFrame.parent;
	                        }
	                        else {
	                            zoneFrame = null;
	                        }
	                    }
	                    else {
	                        frames_1[i] += " [" + zoneFrame.zone.name + "]";
	                    }
	                }
	            }
	            error.stack = error.zoneAwareStack = frames_1.join('\n');
	        }
	        return error;
	    }
	    
	    // Copy the prototype so that instanceof operator works as expected
	    ZoneAwareError.prototype = NativeError.prototype;
	    ZoneAwareError[Zone.__symbol__('blacklistedStackFrames')] = blackListedStackFrames;
	    ZoneAwareError[stackRewrite] = false;
	    if (NativeError.hasOwnProperty('stackTraceLimit')) {
	        // Extend default stack limit as we will be removing few frames.
	        NativeError.stackTraceLimit = Math.max(NativeError.stackTraceLimit, 15);
	        // make sure that ZoneAwareError has the same property which forwards to NativeError.
	        Object.defineProperty(ZoneAwareError, 'stackTraceLimit', {
	            get: function () { return NativeError.stackTraceLimit; },
	            set: function (value) { return NativeError.stackTraceLimit = value; }
	        });
	    }
	    // Now we need to populet the `blacklistedStackFrames` as well as find the
	    // run/runGuraded/runTask frames. This is done by creating a detect zone and then threading
	    // the execution through all of the above methods so that we can look at the stack trace and
	    // find the frames of interest.
	    var detectZone = Zone.current.fork({
	        name: 'detect',
	        onInvoke: function (parentZoneDelegate, currentZone, targetZone, delegate, applyThis, applyArgs, source) {
	            // Here only so that it will show up in the stack frame so that it can be black listed.
	            return parentZoneDelegate.invoke(targetZone, delegate, applyThis, applyArgs, source);
	        },
	        onHandleError: function (parentZD, current, target, error) {
	            if (error.originalStack && Error === ZoneAwareError) {
	                var frames_2 = error.originalStack.split(/\n/);
	                var runFrame = false, runGuardedFrame = false, runTaskFrame = false;
	                while (frames_2.length) {
	                    var frame = frames_2.shift();
	                    // On safari it is possible to have stack frame with no line number.
	                    // This check makes sure that we don't filter frames on name only (must have linenumber)
	                    if (/:\d+:\d+/.test(frame)) {
	                        // Get rid of the path so that we don't accidintely find function name in path.
	                        // In chrome the seperator is `(` and `@` in FF and safari
	                        // Chrome: at Zone.run (zone.js:100)
	                        // Chrome: at Zone.run (http://localhost:9876/base/build/lib/zone.js:100:24)
	                        // FireFox: Zone.prototype.run@http://localhost:9876/base/build/lib/zone.js:101:24
	                        // Safari: run@http://localhost:9876/base/build/lib/zone.js:101:24
	                        var fnName = frame.split('(')[0].split('@')[0];
	                        var frameType = FrameType.trasition;
	                        if (fnName.indexOf('ZoneAwareError') !== -1) {
	                            zoneAwareFrame = frame;
	                        }
	                        if (fnName.indexOf('runGuarded') !== -1) {
	                            runGuardedFrame = true;
	                        }
	                        else if (fnName.indexOf('runTask') !== -1) {
	                            runTaskFrame = true;
	                        }
	                        else if (fnName.indexOf('run') !== -1) {
	                            runFrame = true;
	                        }
	                        else {
	                            frameType = FrameType.blackList;
	                        }
	                        blackListedStackFrames[frame] = frameType;
	                        // Once we find all of the frames we can stop looking.
	                        if (runFrame && runGuardedFrame && runTaskFrame) {
	                            ZoneAwareError[stackRewrite] = true;
	                            break;
	                        }
	                    }
	                }
	            }
	            return false;
	        }
	    });
	    // carefully constructor a stack frame which contains all of the frames of interest which
	    // need to be detected and blacklisted.
	    var detectRunFn = function () {
	        detectZone.run(function () {
	            detectZone.runGuarded(function () {
	                throw new Error('blacklistStackFrames');
	            });
	        });
	    };
	    // Cause the error to extract the stack frames.
	    detectZone.runTask(detectZone.scheduleMacroTask('detect', detectRunFn, null, function () { return null; }, null));
	    return global.Zone = Zone;
	})(typeof window === 'object' && window || typeof self === 'object' && self || global);
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	var zoneSymbol = Zone['__symbol__'];
	var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;
	function bindArguments(args, source) {
	    for (var i = args.length - 1; i >= 0; i--) {
	        if (typeof args[i] === 'function') {
	            args[i] = Zone.current.wrap(args[i], source + '_' + i);
	        }
	    }
	    return args;
	}
	
	function patchPrototype(prototype, fnNames) {
	    var source = prototype.constructor['name'];
	    var _loop_1 = function(i) {
	        var name_1 = fnNames[i];
	        var delegate = prototype[name_1];
	        if (delegate) {
	            prototype[name_1] = (function (delegate) {
	                return function () {
	                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
	                };
	            })(delegate);
	        }
	    };
	    for (var i = 0; i < fnNames.length; i++) {
	        _loop_1(i);
	    }
	}
	
	var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
	var isNode = (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]');
	var isBrowser = !isNode && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
	function patchProperty(obj, prop) {
	    var desc = Object.getOwnPropertyDescriptor(obj, prop) || { enumerable: true, configurable: true };
	    // A property descriptor cannot have getter/setter and be writable
	    // deleting the writable and value properties avoids this error:
	    //
	    // TypeError: property descriptors must not specify a value or be writable when a
	    // getter or setter has been specified
	    delete desc.writable;
	    delete desc.value;
	    // substr(2) cuz 'onclick' -> 'click', etc
	    var eventName = prop.substr(2);
	    var _prop = '_' + prop;
	    desc.set = function (fn) {
	        if (this[_prop]) {
	            this.removeEventListener(eventName, this[_prop]);
	        }
	        if (typeof fn === 'function') {
	            var wrapFn = function (event) {
	                var result;
	                result = fn.apply(this, arguments);
	                if (result != undefined && !result)
	                    event.preventDefault();
	            };
	            this[_prop] = wrapFn;
	            this.addEventListener(eventName, wrapFn, false);
	        }
	        else {
	            this[_prop] = null;
	        }
	    };
	    // The getter would return undefined for unassigned properties but the default value of an
	    // unassigned property is null
	    desc.get = function () {
	        return this[_prop] || null;
	    };
	    Object.defineProperty(obj, prop, desc);
	}
	
	function patchOnProperties(obj, properties) {
	    var onProperties = [];
	    for (var prop in obj) {
	        if (prop.substr(0, 2) == 'on') {
	            onProperties.push(prop);
	        }
	    }
	    for (var j = 0; j < onProperties.length; j++) {
	        patchProperty(obj, onProperties[j]);
	    }
	    if (properties) {
	        for (var i = 0; i < properties.length; i++) {
	            patchProperty(obj, 'on' + properties[i]);
	        }
	    }
	}
	
	var EVENT_TASKS = zoneSymbol('eventTasks');
	// For EventTarget
	var ADD_EVENT_LISTENER = 'addEventListener';
	var REMOVE_EVENT_LISTENER = 'removeEventListener';
	function findExistingRegisteredTask(target, handler, name, capture, remove) {
	    var eventTasks = target[EVENT_TASKS];
	    if (eventTasks) {
	        for (var i = 0; i < eventTasks.length; i++) {
	            var eventTask = eventTasks[i];
	            var data = eventTask.data;
	            var listener = data.handler;
	            if ((data.handler === handler || listener.listener === handler) && data.useCapturing === capture && data.eventName === name) {
	                if (remove) {
	                    eventTasks.splice(i, 1);
	                }
	                return eventTask;
	            }
	        }
	    }
	    return null;
	}
	function findAllExistingRegisteredTasks(target, name, capture, remove) {
	    var eventTasks = target[EVENT_TASKS];
	    if (eventTasks) {
	        var result = [];
	        for (var i = eventTasks.length - 1; i >= 0; i--) {
	            var eventTask = eventTasks[i];
	            var data = eventTask.data;
	            if (data.eventName === name && data.useCapturing === capture) {
	                result.push(eventTask);
	                if (remove) {
	                    eventTasks.splice(i, 1);
	                }
	            }
	        }
	        return result;
	    }
	    return null;
	}
	function attachRegisteredEvent(target, eventTask, isPrepend) {
	    var eventTasks = target[EVENT_TASKS];
	    if (!eventTasks) {
	        eventTasks = target[EVENT_TASKS] = [];
	    }
	    if (isPrepend) {
	        eventTasks.unshift(eventTask);
	    }
	    else {
	        eventTasks.push(eventTask);
	    }
	}
	function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates, isPrepend) {
	    if (useCapturingParam === void 0) { useCapturingParam = true; }
	    if (allowDuplicates === void 0) { allowDuplicates = false; }
	    if (isPrepend === void 0) { isPrepend = false; }
	    var addFnSymbol = zoneSymbol(addFnName);
	    var removeFnSymbol = zoneSymbol(removeFnName);
	    var defaultUseCapturing = useCapturingParam ? false : undefined;
	    function scheduleEventListener(eventTask) {
	        var meta = eventTask.data;
	        attachRegisteredEvent(meta.target, eventTask, isPrepend);
	        return meta.target[addFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);
	    }
	    function cancelEventListener(eventTask) {
	        var meta = eventTask.data;
	        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);
	        meta.target[removeFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);
	    }
	    return function zoneAwareAddListener(self, args) {
	        var eventName = args[0];
	        var handler = args[1];
	        var useCapturing = args[2] || defaultUseCapturing;
	        // - Inside a Web Worker, `this` is undefined, the context is `global`
	        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
	        // see https://github.com/angular/zone.js/issues/190
	        var target = self || _global$1;
	        var delegate = null;
	        if (typeof handler == 'function') {
	            delegate = handler;
	        }
	        else if (handler && handler.handleEvent) {
	            delegate = function (event) { return handler.handleEvent(event); };
	        }
	        var validZoneHandler = false;
	        try {
	            // In cross site contexts (such as WebDriver frameworks like Selenium),
	            // accessing the handler object here will cause an exception to be thrown which
	            // will fail tests prematurely.
	            validZoneHandler = handler && handler.toString() === '[object FunctionWrapper]';
	        }
	        catch (e) {
	            // Returning nothing here is fine, because objects in a cross-site context are unusable
	            return;
	        }
	        // Ignore special listeners of IE11 & Edge dev tools, see
	        // https://github.com/angular/zone.js/issues/150
	        if (!delegate || validZoneHandler) {
	            return target[addFnSymbol](eventName, handler, useCapturing);
	        }
	        if (!allowDuplicates) {
	            var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, false);
	            if (eventTask) {
	                // we already registered, so this will have noop.
	                return target[addFnSymbol](eventName, eventTask.invoke, useCapturing);
	            }
	        }
	        var zone = Zone.current;
	        var source = target.constructor['name'] + '.' + addFnName + ':' + eventName;
	        var data = {
	            target: target,
	            eventName: eventName,
	            name: eventName,
	            useCapturing: useCapturing,
	            handler: handler
	        };
	        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
	    };
	}
	function makeZoneAwareRemoveListener(fnName, useCapturingParam) {
	    if (useCapturingParam === void 0) { useCapturingParam = true; }
	    var symbol = zoneSymbol(fnName);
	    var defaultUseCapturing = useCapturingParam ? false : undefined;
	    return function zoneAwareRemoveListener(self, args) {
	        var eventName = args[0];
	        var handler = args[1];
	        var useCapturing = args[2] || defaultUseCapturing;
	        // - Inside a Web Worker, `this` is undefined, the context is `global`
	        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
	        // see https://github.com/angular/zone.js/issues/190
	        var target = self || _global$1;
	        var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, true);
	        if (eventTask) {
	            eventTask.zone.cancelTask(eventTask);
	        }
	        else {
	            target[symbol](eventName, handler, useCapturing);
	        }
	    };
	}
	
	
	var zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);
	var zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);
	function patchEventTargetMethods(obj) {
	    if (obj && obj.addEventListener) {
	        patchMethod(obj, ADD_EVENT_LISTENER, function () { return zoneAwareAddEventListener; });
	        patchMethod(obj, REMOVE_EVENT_LISTENER, function () { return zoneAwareRemoveEventListener; });
	        return true;
	    }
	    else {
	        return false;
	    }
	}
	var originalInstanceKey = zoneSymbol('originalInstance');
	// wrap some native API on `window`
	function patchClass(className) {
	    var OriginalClass = _global$1[className];
	    if (!OriginalClass)
	        return;
	    _global$1[className] = function () {
	        var a = bindArguments(arguments, className);
	        switch (a.length) {
	            case 0:
	                this[originalInstanceKey] = new OriginalClass();
	                break;
	            case 1:
	                this[originalInstanceKey] = new OriginalClass(a[0]);
	                break;
	            case 2:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
	                break;
	            case 3:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
	                break;
	            case 4:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
	                break;
	            default:
	                throw new Error('Arg list too long.');
	        }
	    };
	    var instance = new OriginalClass(function () { });
	    var prop;
	    for (prop in instance) {
	        // https://bugs.webkit.org/show_bug.cgi?id=44721
	        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
	            continue;
	        (function (prop) {
	            if (typeof instance[prop] === 'function') {
	                _global$1[className].prototype[prop] = function () {
	                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
	                };
	            }
	            else {
	                Object.defineProperty(_global$1[className].prototype, prop, {
	                    set: function (fn) {
	                        if (typeof fn === 'function') {
	                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);
	                        }
	                        else {
	                            this[originalInstanceKey][prop] = fn;
	                        }
	                    },
	                    get: function () {
	                        return this[originalInstanceKey][prop];
	                    }
	                });
	            }
	        }(prop));
	    }
	    for (prop in OriginalClass) {
	        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
	            _global$1[className][prop] = OriginalClass[prop];
	        }
	    }
	}
	
	function createNamedFn(name, delegate) {
	    try {
	        return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
	    }
	    catch (e) {
	        // if we fail, we must be CSP, just return delegate.
	        return function () {
	            return delegate(this, arguments);
	        };
	    }
	}
	function patchMethod(target, name, patchFn) {
	    var proto = target;
	    while (proto && Object.getOwnPropertyNames(proto).indexOf(name) === -1) {
	        proto = Object.getPrototypeOf(proto);
	    }
	    if (!proto && target[name]) {
	        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
	        proto = target;
	    }
	    var delegateName = zoneSymbol(name);
	    var delegate;
	    if (proto && !(delegate = proto[delegateName])) {
	        delegate = proto[delegateName] = proto[name];
	        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
	    }
	    return delegate;
	}
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	function patchTimer(window, setName, cancelName, nameSuffix) {
	    var setNative = null;
	    var clearNative = null;
	    setName += nameSuffix;
	    cancelName += nameSuffix;
	    var tasksByHandleId = {};
	    function scheduleTask(task) {
	        var data = task.data;
	        data.args[0] = function () {
	            task.invoke.apply(this, arguments);
	            delete tasksByHandleId[data.handleId];
	        };
	        data.handleId = setNative.apply(window, data.args);
	        tasksByHandleId[data.handleId] = task;
	        return task;
	    }
	    function clearTask(task) {
	        delete tasksByHandleId[task.data.handleId];
	        return clearNative(task.data.handleId);
	    }
	    setNative =
	        patchMethod(window, setName, function (delegate) { return function (self, args) {
	            if (typeof args[0] === 'function') {
	                var zone = Zone.current;
	                var options = {
	                    handleId: null,
	                    isPeriodic: nameSuffix === 'Interval',
	                    delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
	                    args: args
	                };
	                var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
	                if (!task) {
	                    return task;
	                }
	                // Node.js must additionally support the ref and unref functions.
	                var handle = task.data.handleId;
	                if (handle.ref && handle.unref) {
	                    task.ref = handle.ref.bind(handle);
	                    task.unref = handle.unref.bind(handle);
	                }
	                return task;
	            }
	            else {
	                // cause an error by calling it directly.
	                return delegate.apply(window, args);
	            }
	        }; });
	    clearNative =
	        patchMethod(window, cancelName, function (delegate) { return function (self, args) {
	            var task = typeof args[0] === 'number' ? tasksByHandleId[args[0]] : args[0];
	            if (task && typeof task.type === 'string') {
	                if (task.cancelFn && task.data.isPeriodic || task.runCount === 0) {
	                    // Do not cancel already canceled functions
	                    task.zone.cancelTask(task);
	                }
	            }
	            else {
	                // cause an error by calling it directly.
	                delegate.apply(window, args);
	            }
	        }; });
	}
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	/*
	 * This is necessary for Chrome and Chrome mobile, to enable
	 * things like redefining `createdCallback` on an element.
	 */
	var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
	var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] =
	    Object.getOwnPropertyDescriptor;
	var _create = Object.create;
	var unconfigurablesKey = zoneSymbol('unconfigurables');
	function propertyPatch() {
	    Object.defineProperty = function (obj, prop, desc) {
	        if (isUnconfigurable(obj, prop)) {
	            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
	        }
	        var originalConfigurableFlag = desc.configurable;
	        if (prop !== 'prototype') {
	            desc = rewriteDescriptor(obj, prop, desc);
	        }
	        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
	    };
	    Object.defineProperties = function (obj, props) {
	        Object.keys(props).forEach(function (prop) {
	            Object.defineProperty(obj, prop, props[prop]);
	        });
	        return obj;
	    };
	    Object.create = function (obj, proto) {
	        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
	            Object.keys(proto).forEach(function (prop) {
	                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
	            });
	        }
	        return _create(obj, proto);
	    };
	    Object.getOwnPropertyDescriptor = function (obj, prop) {
	        var desc = _getOwnPropertyDescriptor(obj, prop);
	        if (isUnconfigurable(obj, prop)) {
	            desc.configurable = false;
	        }
	        return desc;
	    };
	}
	
	function _redefineProperty(obj, prop, desc) {
	    var originalConfigurableFlag = desc.configurable;
	    desc = rewriteDescriptor(obj, prop, desc);
	    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
	}
	
	function isUnconfigurable(obj, prop) {
	    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
	}
	function rewriteDescriptor(obj, prop, desc) {
	    desc.configurable = true;
	    if (!desc.configurable) {
	        if (!obj[unconfigurablesKey]) {
	            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
	        }
	        obj[unconfigurablesKey][prop] = true;
	    }
	    return desc;
	}
	function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
	    try {
	        return _defineProperty(obj, prop, desc);
	    }
	    catch (e) {
	        if (desc.configurable) {
	            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
	            // retry with the original flag value
	            if (typeof originalConfigurableFlag == 'undefined') {
	                delete desc.configurable;
	            }
	            else {
	                desc.configurable = originalConfigurableFlag;
	            }
	            try {
	                return _defineProperty(obj, prop, desc);
	            }
	            catch (e) {
	                var descJson = null;
	                try {
	                    descJson = JSON.stringify(desc);
	                }
	                catch (e) {
	                    descJson = descJson.toString();
	                }
	                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + e);
	            }
	        }
	        else {
	            throw e;
	        }
	    }
	}
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
	var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
	    .split(',');
	var EVENT_TARGET = 'EventTarget';
	function eventTargetPatch(_global) {
	    var apis = [];
	    var isWtf = _global['wtf'];
	    if (isWtf) {
	        // Workaround for: https://github.com/google/tracing-framework/issues/555
	        apis = WTF_ISSUE_555.split(',').map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
	    }
	    else if (_global[EVENT_TARGET]) {
	        apis.push(EVENT_TARGET);
	    }
	    else {
	        // Note: EventTarget is not available in all browsers,
	        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
	        apis = NO_EVENT_TARGET;
	    }
	    for (var i = 0; i < apis.length; i++) {
	        var type = _global[apis[i]];
	        patchEventTargetMethods(type && type.prototype);
	    }
	}
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	// we have to patch the instance since the proto is non-configurable
	function apply(_global) {
	    var WS = _global.WebSocket;
	    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
	    // On older Chrome, no need since EventTarget was already patched
	    if (!_global.EventTarget) {
	        patchEventTargetMethods(WS.prototype);
	    }
	    _global.WebSocket = function (a, b) {
	        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
	        var proxySocket;
	        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
	        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
	        if (onmessageDesc && onmessageDesc.configurable === false) {
	            proxySocket = Object.create(socket);
	            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
	                proxySocket[propName] = function () {
	                    return socket[propName].apply(socket, arguments);
	                };
	            });
	        }
	        else {
	            // we can patch the real socket
	            proxySocket = socket;
	        }
	        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
	        return proxySocket;
	    };
	    for (var prop in WS) {
	        _global.WebSocket[prop] = WS[prop];
	    }
	}
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'
	    .split(' ');
	function propertyDescriptorPatch(_global) {
	    if (isNode) {
	        return;
	    }
	    var supportsWebSocket = typeof WebSocket !== 'undefined';
	    if (canPatchViaPropertyDescriptor()) {
	        // for browsers that we can patch the descriptor:  Chrome & Firefox
	        if (isBrowser) {
	            patchOnProperties(HTMLElement.prototype, eventNames);
	        }
	        patchOnProperties(XMLHttpRequest.prototype, null);
	        if (typeof IDBIndex !== 'undefined') {
	            patchOnProperties(IDBIndex.prototype, null);
	            patchOnProperties(IDBRequest.prototype, null);
	            patchOnProperties(IDBOpenDBRequest.prototype, null);
	            patchOnProperties(IDBDatabase.prototype, null);
	            patchOnProperties(IDBTransaction.prototype, null);
	            patchOnProperties(IDBCursor.prototype, null);
	        }
	        if (supportsWebSocket) {
	            patchOnProperties(WebSocket.prototype, null);
	        }
	    }
	    else {
	        // Safari, Android browsers (Jelly Bean)
	        patchViaCapturingAllTheEvents();
	        patchClass('XMLHttpRequest');
	        if (supportsWebSocket) {
	            apply(_global);
	        }
	    }
	}
	function canPatchViaPropertyDescriptor() {
	    if (isBrowser && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
	        typeof Element !== 'undefined') {
	        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
	        // IDL interface attributes are not configurable
	        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
	        if (desc && !desc.configurable)
	            return false;
	    }
	    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
	        get: function () {
	            return true;
	        }
	    });
	    var req = new XMLHttpRequest();
	    var result = !!req.onreadystatechange;
	    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {});
	    return result;
	}
	
	var unboundKey = zoneSymbol('unbound');
	// Whenever any eventListener fires, we check the eventListener target and all parents
	// for `onwhatever` properties and replace them with zone-bound functions
	// - Chrome (for now)
	function patchViaCapturingAllTheEvents() {
	    var _loop_1 = function(i) {
	        var property = eventNames[i];
	        var onproperty = 'on' + property;
	        self.addEventListener(property, function (event) {
	            var elt = event.target, bound, source;
	            if (elt) {
	                source = elt.constructor['name'] + '.' + onproperty;
	            }
	            else {
	                source = 'unknown.' + onproperty;
	            }
	            while (elt) {
	                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
	                    bound = Zone.current.wrap(elt[onproperty], source);
	                    bound[unboundKey] = elt[onproperty];
	                    elt[onproperty] = bound;
	                }
	                elt = elt.parentElement;
	            }
	        }, true);
	    };
	    for (var i = 0; i < eventNames.length; i++) {
	        _loop_1(i);
	    }
	    
	}
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	function registerElementPatch(_global) {
	    if (!isBrowser || !('registerElement' in _global.document)) {
	        return;
	    }
	    var _registerElement = document.registerElement;
	    var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
	    document.registerElement = function (name, opts) {
	        if (opts && opts.prototype) {
	            callbacks.forEach(function (callback) {
	                var source = 'Document.registerElement::' + callback;
	                if (opts.prototype.hasOwnProperty(callback)) {
	                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
	                    if (descriptor && descriptor.value) {
	                        descriptor.value = Zone.current.wrap(descriptor.value, source);
	                        _redefineProperty(opts.prototype, callback, descriptor);
	                    }
	                    else {
	                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
	                    }
	                }
	                else if (opts.prototype[callback]) {
	                    opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
	                }
	            });
	        }
	        return _registerElement.apply(document, [name, opts]);
	    };
	}
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	var set = 'set';
	var clear = 'clear';
	var blockingMethods = ['alert', 'prompt', 'confirm'];
	var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
	patchTimer(_global, set, clear, 'Timeout');
	patchTimer(_global, set, clear, 'Interval');
	patchTimer(_global, set, clear, 'Immediate');
	patchTimer(_global, 'request', 'cancel', 'AnimationFrame');
	patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
	patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
	for (var i = 0; i < blockingMethods.length; i++) {
	    var name = blockingMethods[i];
	    patchMethod(_global, name, function (delegate, symbol, name) {
	        return function (s, args) {
	            return Zone.current.run(delegate, _global, args, name);
	        };
	    });
	}
	eventTargetPatch(_global);
	propertyDescriptorPatch(_global);
	patchClass('MutationObserver');
	patchClass('WebKitMutationObserver');
	patchClass('FileReader');
	propertyPatch();
	registerElementPatch(_global);
	// Treat XMLHTTPRequest as a macrotask.
	patchXHR(_global);
	var XHR_TASK = zoneSymbol('xhrTask');
	var XHR_SYNC = zoneSymbol('xhrSync');
	function patchXHR(window) {
	    function findPendingTask(target) {
	        var pendingTask = target[XHR_TASK];
	        return pendingTask;
	    }
	    function scheduleTask(task) {
	        var data = task.data;
	        data.target.addEventListener('readystatechange', function () {
	            if (data.target.readyState === data.target.DONE) {
	                if (!data.aborted) {
	                    task.invoke();
	                }
	            }
	        });
	        var storedTask = data.target[XHR_TASK];
	        if (!storedTask) {
	            data.target[XHR_TASK] = task;
	        }
	        sendNative.apply(data.target, data.args);
	        return task;
	    }
	    function placeholderCallback() { }
	    function clearTask(task) {
	        var data = task.data;
	        // Note - ideally, we would call data.target.removeEventListener here, but it's too late
	        // to prevent it from firing. So instead, we store info for the event listener.
	        data.aborted = true;
	        return abortNative.apply(data.target, data.args);
	    }
	    var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
	        self[XHR_SYNC] = args[2] == false;
	        return openNative.apply(self, args);
	    }; });
	    var sendNative = patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
	        var zone = Zone.current;
	        if (self[XHR_SYNC]) {
	            // if the XHR is sync there is no task to schedule, just execute the code.
	            return sendNative.apply(self, args);
	        }
	        else {
	            var options = { target: self, isPeriodic: false, delay: null, args: args, aborted: false };
	            return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);
	        }
	    }; });
	    var abortNative = patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
	        var task = findPendingTask(self);
	        if (task && typeof task.type == 'string') {
	            // If the XHR has already completed, do nothing.
	            if (task.cancelFn == null) {
	                return;
	            }
	            task.zone.cancelTask(task);
	        }
	        // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no task
	        // to cancel. Do nothing.
	    }; });
	}
	/// GEO_LOCATION
	if (_global['navigator'] && _global['navigator'].geolocation) {
	    patchPrototype(_global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
	}
	
	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(31)))

/***/ },
/* 31 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license Angular v2.3.0
	 * (c) 2010-2016 Google, Inc. https://angular.io/
	 * License: MIT
	 */
	(function (global, factory) {
	     true ? factory(exports, __webpack_require__(3), __webpack_require__(5), __webpack_require__(21)) :
	    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Observable', '@angular/platform-browser'], factory) :
	    (factory((global.ng = global.ng || {}, global.ng.http = global.ng.http || {}),global.ng.core,global.Rx,global.ng.platformBrowser));
	}(this, function (exports,_angular_core,rxjs_Observable,_angular_platformBrowser) { 'use strict';
	
	    /**
	     *  A backend for http that uses the `XMLHttpRequest` browser API.
	      * *
	      * Take care not to evaluate this in non-browser contexts.
	      * *
	     */
	    var BrowserXhr = (function () {
	        function BrowserXhr() {
	        }
	        /**
	         * @return {?}
	         */
	        BrowserXhr.prototype.build = function () { return ((new XMLHttpRequest())); };
	        BrowserXhr.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        BrowserXhr.ctorParameters = function () { return []; };
	        return BrowserXhr;
	    }());
	
	    var RequestMethod = {};
	    RequestMethod.Get = 0;
	    RequestMethod.Post = 1;
	    RequestMethod.Put = 2;
	    RequestMethod.Delete = 3;
	    RequestMethod.Options = 4;
	    RequestMethod.Head = 5;
	    RequestMethod.Patch = 6;
	    RequestMethod[RequestMethod.Get] = "Get";
	    RequestMethod[RequestMethod.Post] = "Post";
	    RequestMethod[RequestMethod.Put] = "Put";
	    RequestMethod[RequestMethod.Delete] = "Delete";
	    RequestMethod[RequestMethod.Options] = "Options";
	    RequestMethod[RequestMethod.Head] = "Head";
	    RequestMethod[RequestMethod.Patch] = "Patch";
	    var ReadyState = {};
	    ReadyState.Unsent = 0;
	    ReadyState.Open = 1;
	    ReadyState.HeadersReceived = 2;
	    ReadyState.Loading = 3;
	    ReadyState.Done = 4;
	    ReadyState.Cancelled = 5;
	    ReadyState[ReadyState.Unsent] = "Unsent";
	    ReadyState[ReadyState.Open] = "Open";
	    ReadyState[ReadyState.HeadersReceived] = "HeadersReceived";
	    ReadyState[ReadyState.Loading] = "Loading";
	    ReadyState[ReadyState.Done] = "Done";
	    ReadyState[ReadyState.Cancelled] = "Cancelled";
	    var ResponseType = {};
	    ResponseType.Basic = 0;
	    ResponseType.Cors = 1;
	    ResponseType.Default = 2;
	    ResponseType.Error = 3;
	    ResponseType.Opaque = 4;
	    ResponseType[ResponseType.Basic] = "Basic";
	    ResponseType[ResponseType.Cors] = "Cors";
	    ResponseType[ResponseType.Default] = "Default";
	    ResponseType[ResponseType.Error] = "Error";
	    ResponseType[ResponseType.Opaque] = "Opaque";
	    var ContentType = {};
	    ContentType.NONE = 0;
	    ContentType.JSON = 1;
	    ContentType.FORM = 2;
	    ContentType.FORM_DATA = 3;
	    ContentType.TEXT = 4;
	    ContentType.BLOB = 5;
	    ContentType.ARRAY_BUFFER = 6;
	    ContentType[ContentType.NONE] = "NONE";
	    ContentType[ContentType.JSON] = "JSON";
	    ContentType[ContentType.FORM] = "FORM";
	    ContentType[ContentType.FORM_DATA] = "FORM_DATA";
	    ContentType[ContentType.TEXT] = "TEXT";
	    ContentType[ContentType.BLOB] = "BLOB";
	    ContentType[ContentType.ARRAY_BUFFER] = "ARRAY_BUFFER";
	    var ResponseContentType = {};
	    ResponseContentType.Text = 0;
	    ResponseContentType.Json = 1;
	    ResponseContentType.ArrayBuffer = 2;
	    ResponseContentType.Blob = 3;
	    ResponseContentType[ResponseContentType.Text] = "Text";
	    ResponseContentType[ResponseContentType.Json] = "Json";
	    ResponseContentType[ResponseContentType.ArrayBuffer] = "ArrayBuffer";
	    ResponseContentType[ResponseContentType.Blob] = "Blob";
	
	    /**
	     *  Polyfill for [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers), as
	      * specified in the [Fetch Spec](https://fetch.spec.whatwg.org/#headers-class).
	      * *
	      * The only known difference between this `Headers` implementation and the spec is the
	      * lack of an `entries` method.
	      * *
	      * ### Example
	      * *
	      * ```
	      * import {Headers} from '@angular/http';
	      * *
	      * var firstHeaders = new Headers();
	      * firstHeaders.append('Content-Type', 'image/jpeg');
	      * console.log(firstHeaders.get('Content-Type')) //'image/jpeg'
	      * *
	      * // Create headers from Plain Old JavaScript Object
	      * var secondHeaders = new Headers({
	      * 'X-My-Custom-Header': 'Angular'
	      * });
	      * console.log(secondHeaders.get('X-My-Custom-Header')); //'Angular'
	      * *
	      * var thirdHeaders = new Headers(secondHeaders);
	      * console.log(thirdHeaders.get('X-My-Custom-Header')); //'Angular'
	      * ```
	      * *
	     */
	    var Headers = (function () {
	        /**
	         * @param {?=} headers
	         */
	        function Headers(headers) {
	            var _this = this;
	            /** @internal header names are lower case */
	            this._headers = new Map();
	            /** @internal map lower case names to actual names */
	            this._normalizedNames = new Map();
	            if (!headers) {
	                return;
	            }
	            if (headers instanceof Headers) {
	                headers.forEach(function (values, name) {
	                    values.forEach(function (value) { return _this.append(name, value); });
	                });
	                return;
	            }
	            Object.keys(headers).forEach(function (name) {
	                var values = Array.isArray(headers[name]) ? headers[name] : [headers[name]];
	                _this.delete(name);
	                values.forEach(function (value) { return _this.append(name, value); });
	            });
	        }
	        /**
	         *  Returns a new Headers instance from the given DOMString of Response Headers
	         * @param {?} headersString
	         * @return {?}
	         */
	        Headers.fromResponseHeaderString = function (headersString) {
	            var /** @type {?} */ headers = new Headers();
	            headersString.split('\n').forEach(function (line) {
	                var /** @type {?} */ index = line.indexOf(':');
	                if (index > 0) {
	                    var /** @type {?} */ name_1 = line.slice(0, index);
	                    var /** @type {?} */ value = line.slice(index + 1).trim();
	                    headers.set(name_1, value);
	                }
	            });
	            return headers;
	        };
	        /**
	         *  Appends a header to existing list of header values for a given header name.
	         * @param {?} name
	         * @param {?} value
	         * @return {?}
	         */
	        Headers.prototype.append = function (name, value) {
	            var /** @type {?} */ values = this.getAll(name);
	            if (values === null) {
	                this.set(name, value);
	            }
	            else {
	                values.push(value);
	            }
	        };
	        /**
	         *  Deletes all header values for the given name.
	         * @param {?} name
	         * @return {?}
	         */
	        Headers.prototype.delete = function (name) {
	            var /** @type {?} */ lcName = name.toLowerCase();
	            this._normalizedNames.delete(lcName);
	            this._headers.delete(lcName);
	        };
	        /**
	         * @param {?} fn
	         * @return {?}
	         */
	        Headers.prototype.forEach = function (fn) {
	            var _this = this;
	            this._headers.forEach(function (values, lcName) { return fn(values, _this._normalizedNames.get(lcName), _this._headers); });
	        };
	        /**
	         *  Returns first header that matches given name.
	         * @param {?} name
	         * @return {?}
	         */
	        Headers.prototype.get = function (name) {
	            var /** @type {?} */ values = this.getAll(name);
	            if (values === null) {
	                return null;
	            }
	            return values.length > 0 ? values[0] : null;
	        };
	        /**
	         *  Checks for existence of header by given name.
	         * @param {?} name
	         * @return {?}
	         */
	        Headers.prototype.has = function (name) { return this._headers.has(name.toLowerCase()); };
	        /**
	         *  Returns the names of the headers
	         * @return {?}
	         */
	        Headers.prototype.keys = function () { return Array.from(this._normalizedNames.values()); };
	        /**
	         *  Sets or overrides header value for given name.
	         * @param {?} name
	         * @param {?} value
	         * @return {?}
	         */
	        Headers.prototype.set = function (name, value) {
	            if (Array.isArray(value)) {
	                if (value.length) {
	                    this._headers.set(name.toLowerCase(), [value.join(',')]);
	                }
	            }
	            else {
	                this._headers.set(name.toLowerCase(), [value]);
	            }
	            this.mayBeSetNormalizedName(name);
	        };
	        /**
	         *  Returns values of all headers.
	         * @return {?}
	         */
	        Headers.prototype.values = function () { return Array.from(this._headers.values()); };
	        /**
	         * @return {?}
	         */
	        Headers.prototype.toJSON = function () {
	            var _this = this;
	            var /** @type {?} */ serialized = {};
	            this._headers.forEach(function (values, name) {
	                var /** @type {?} */ split = [];
	                values.forEach(function (v) { return split.push.apply(split, v.split(',')); });
	                serialized[_this._normalizedNames.get(name)] = split;
	            });
	            return serialized;
	        };
	        /**
	         *  Returns list of header values for a given name.
	         * @param {?} name
	         * @return {?}
	         */
	        Headers.prototype.getAll = function (name) {
	            return this.has(name) ? this._headers.get(name.toLowerCase()) : null;
	        };
	        /**
	         *  This method is not implemented.
	         * @return {?}
	         */
	        Headers.prototype.entries = function () { throw new Error('"entries" method is not implemented on Headers class'); };
	        /**
	         * @param {?} name
	         * @return {?}
	         */
	        Headers.prototype.mayBeSetNormalizedName = function (name) {
	            var /** @type {?} */ lcName = name.toLowerCase();
	            if (!this._normalizedNames.has(lcName)) {
	                this._normalizedNames.set(lcName, name);
	            }
	        };
	        return Headers;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$1 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     *  Creates a response options object to be optionally provided when instantiating a
	      * {@link Response}.
	      * *
	      * This class is based on the `ResponseInit` description in the [Fetch
	      * Spec](https://fetch.spec.whatwg.org/#responseinit).
	      * *
	      * All values are null by default. Typical defaults can be found in the
	      * {@link BaseResponseOptions} class, which sub-classes `ResponseOptions`.
	      * *
	      * This class may be used in tests to build {@link Response Responses} for
	      * mock responses (see {@link MockBackend}).
	      * *
	      * ### Example ([live demo](http://plnkr.co/edit/P9Jkk8e8cz6NVzbcxEsD?p=preview))
	      * *
	      * ```typescript
	      * import {ResponseOptions, Response} from '@angular/http';
	      * *
	      * var options = new ResponseOptions({
	      * body: '{"name":"Jeff"}'
	      * });
	      * var res = new Response(options);
	      * *
	      * console.log('res.json():', res.json()); // Object {name: "Jeff"}
	      * ```
	      * *
	     */
	    var ResponseOptions = (function () {
	        /**
	         * @param {?=} __0
	         */
	        function ResponseOptions(_a) {
	            var _b = _a === void 0 ? {} : _a, body = _b.body, status = _b.status, headers = _b.headers, statusText = _b.statusText, type = _b.type, url = _b.url;
	            this.body = body != null ? body : null;
	            this.status = status != null ? status : null;
	            this.headers = headers != null ? headers : null;
	            this.statusText = statusText != null ? statusText : null;
	            this.type = type != null ? type : null;
	            this.url = url != null ? url : null;
	        }
	        /**
	         *  Creates a copy of the `ResponseOptions` instance, using the optional input as values to
	          * override
	          * existing values. This method will not change the values of the instance on which it is being
	          * called.
	          * *
	          * This may be useful when sharing a base `ResponseOptions` object inside tests,
	          * where certain properties may change from test to test.
	          * *
	          * ### Example ([live demo](http://plnkr.co/edit/1lXquqFfgduTFBWjNoRE?p=preview))
	          * *
	          * ```typescript
	          * import {ResponseOptions, Response} from '@angular/http';
	          * *
	          * var options = new ResponseOptions({
	          * body: {name: 'Jeff'}
	          * });
	          * var res = new Response(options.merge({
	          * url: 'https://google.com'
	          * }));
	          * console.log('options.url:', options.url); // null
	          * console.log('res.json():', res.json()); // Object {name: "Jeff"}
	          * console.log('res.url:', res.url); // https://google.com
	          * ```
	         * @param {?=} options
	         * @return {?}
	         */
	        ResponseOptions.prototype.merge = function (options) {
	            return new ResponseOptions({
	                body: options && options.body != null ? options.body : this.body,
	                status: options && options.status != null ? options.status : this.status,
	                headers: options && options.headers != null ? options.headers : this.headers,
	                statusText: options && options.statusText != null ? options.statusText : this.statusText,
	                type: options && options.type != null ? options.type : this.type,
	                url: options && options.url != null ? options.url : this.url,
	            });
	        };
	        return ResponseOptions;
	    }());
	    /**
	     *  Subclass of {@link ResponseOptions}, with default values.
	      * *
	      * Default values:
	      * * status: 200
	      * * headers: empty {@link Headers} object
	      * *
	      * This class could be extended and bound to the {@link ResponseOptions} class
	      * when configuring an {@link Injector}, in order to override the default options
	      * used by {@link Http} to create {@link Response Responses}.
	      * *
	      * ### Example ([live demo](http://plnkr.co/edit/qv8DLT?p=preview))
	      * *
	      * ```typescript
	      * import {provide} from '@angular/core';
	      * import {bootstrap} from '@angular/platform-browser/browser';
	      * import {HTTP_PROVIDERS, Headers, Http, BaseResponseOptions, ResponseOptions} from
	      * '@angular/http';
	      * import {App} from './myapp';
	      * *
	      * class MyOptions extends BaseResponseOptions {
	      * headers:Headers = new Headers({network: 'github'});
	      * }
	      * *
	      * bootstrap(App, [HTTP_PROVIDERS, {provide: ResponseOptions, useClass: MyOptions}]);
	      * ```
	      * *
	      * The options could also be extended when manually creating a {@link Response}
	      * object.
	      * *
	      * ### Example ([live demo](http://plnkr.co/edit/VngosOWiaExEtbstDoix?p=preview))
	      * *
	      * ```
	      * import {BaseResponseOptions, Response} from '@angular/http';
	      * *
	      * var options = new BaseResponseOptions();
	      * var res = new Response(options.merge({
	      * body: 'Angular',
	      * headers: new Headers({framework: 'angular'})
	      * }));
	      * console.log('res.headers.get("framework"):', res.headers.get('framework')); // angular
	      * console.log('res.text():', res.text()); // Angular;
	      * ```
	      * *
	     */
	    var BaseResponseOptions = (function (_super) {
	        __extends$1(BaseResponseOptions, _super);
	        function BaseResponseOptions() {
	            _super.call(this, { status: 200, statusText: 'Ok', type: ResponseType.Default, headers: new Headers() });
	        }
	        BaseResponseOptions.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        BaseResponseOptions.ctorParameters = function () { return []; };
	        return BaseResponseOptions;
	    }(ResponseOptions));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    /**
	     *  Abstract class from which real backends are derived.
	      * *
	      * The primary purpose of a `ConnectionBackend` is to create new connections to fulfill a given
	      * {@link Request}.
	      * *
	     * @abstract
	     */
	    var ConnectionBackend = (function () {
	        function ConnectionBackend() {
	        }
	        /**
	         * @abstract
	         * @param {?} request
	         * @return {?}
	         */
	        ConnectionBackend.prototype.createConnection = function (request) { };
	        return ConnectionBackend;
	    }());
	    /**
	     *  Abstract class from which real connections are derived.
	      * *
	     * @abstract
	     */
	    var Connection = (function () {
	        function Connection() {
	        }
	        return Connection;
	    }());
	    /**
	     *  An XSRFStrategy configures XSRF protection (e.g. via headers) on an HTTP request.
	      * *
	     * @abstract
	     */
	    var XSRFStrategy = (function () {
	        function XSRFStrategy() {
	        }
	        /**
	         * @abstract
	         * @param {?} req
	         * @return {?}
	         */
	        XSRFStrategy.prototype.configureRequest = function (req) { };
	        return XSRFStrategy;
	    }());
	
	    /**
	     * @param {?} method
	     * @return {?}
	     */
	    function normalizeMethodName(method) {
	        if (typeof method !== 'string')
	            return method;
	        switch (method.toUpperCase()) {
	            case 'GET':
	                return RequestMethod.Get;
	            case 'POST':
	                return RequestMethod.Post;
	            case 'PUT':
	                return RequestMethod.Put;
	            case 'DELETE':
	                return RequestMethod.Delete;
	            case 'OPTIONS':
	                return RequestMethod.Options;
	            case 'HEAD':
	                return RequestMethod.Head;
	            case 'PATCH':
	                return RequestMethod.Patch;
	        }
	        throw new Error("Invalid request method. The method \"" + method + "\" is not supported.");
	    }
	    var /** @type {?} */ isSuccess = function (status) { return (status >= 200 && status < 300); };
	    /**
	     * @param {?} xhr
	     * @return {?}
	     */
	    function getResponseURL(xhr) {
	        if ('responseURL' in xhr) {
	            return xhr.responseURL;
	        }
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	            return xhr.getResponseHeader('X-Request-URL');
	        }
	        return;
	    }
	    /**
	     * @param {?} input
	     * @return {?}
	     */
	    function stringToArrayBuffer(input) {
	        var /** @type {?} */ view = new Uint16Array(input.length);
	        for (var /** @type {?} */ i = 0, /** @type {?} */ strLen = input.length; i < strLen; i++) {
	            view[i] = input.charCodeAt(i);
	        }
	        return view.buffer;
	    }
	
	    /**
	     * @license undefined
	      * Copyright Google Inc. All Rights Reserved.
	      * *
	      * Use of this source code is governed by an MIT-style license that can be
	      * found in the LICENSE file at https://angular.io/license
	     * @param {?=} rawParams
	     * @return {?}
	     */
	    function paramParser(rawParams) {
	        if (rawParams === void 0) { rawParams = ''; }
	        var /** @type {?} */ map = new Map();
	        if (rawParams.length > 0) {
	            var /** @type {?} */ params = rawParams.split('&');
	            params.forEach(function (param) {
	                var /** @type {?} */ eqIdx = param.indexOf('=');
	                var _a = eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)], key = _a[0], val = _a[1];
	                var /** @type {?} */ list = map.get(key) || [];
	                list.push(val);
	                map.set(key, list);
	            });
	        }
	        return map;
	    }
	    /**
	     *  *
	     */
	    var QueryEncoder = (function () {
	        function QueryEncoder() {
	        }
	        /**
	         * @param {?} k
	         * @return {?}
	         */
	        QueryEncoder.prototype.encodeKey = function (k) { return standardEncoding(k); };
	        /**
	         * @param {?} v
	         * @return {?}
	         */
	        QueryEncoder.prototype.encodeValue = function (v) { return standardEncoding(v); };
	        return QueryEncoder;
	    }());
	    /**
	     * @param {?} v
	     * @return {?}
	     */
	    function standardEncoding(v) {
	        return encodeURIComponent(v)
	            .replace(/%40/gi, '@')
	            .replace(/%3A/gi, ':')
	            .replace(/%24/gi, '$')
	            .replace(/%2C/gi, ',')
	            .replace(/%3B/gi, ';')
	            .replace(/%2B/gi, '+')
	            .replace(/%3D/gi, '=')
	            .replace(/%3F/gi, '?')
	            .replace(/%2F/gi, '/');
	    }
	    /**
	     *  Map-like representation of url search parameters, based on
	      * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
	      * with several extensions for merging URLSearchParams objects:
	      * - setAll()
	      * - appendAll()
	      * - replaceAll()
	      * *
	      * This class accepts an optional second parameter of ${@link QueryEncoder},
	      * which is used to serialize parameters before making a request. By default,
	      * `QueryEncoder` encodes keys and values of parameters using `encodeURIComponent`,
	      * and then un-encodes certain characters that are allowed to be part of the query
	      * according to IETF RFC 3986: https://tools.ietf.org/html/rfc3986.
	      * *
	      * These are the characters that are not encoded: `! $ \' ( ) * + , ; A 9 - . _ ~ ? /`
	      * *
	      * If the set of allowed query characters is not acceptable for a particular backend,
	      * `QueryEncoder` can be subclassed and provided as the 2nd argument to URLSearchParams.
	      * *
	      * ```
	      * import {URLSearchParams, QueryEncoder} from '@angular/http';
	      * class MyQueryEncoder extends QueryEncoder {
	      * encodeKey(k: string): string {
	      * return myEncodingFunction(k);
	      * }
	      * *
	      * encodeValue(v: string): string {
	      * return myEncodingFunction(v);
	      * }
	      * }
	      * *
	      * let params = new URLSearchParams('', new MyQueryEncoder());
	      * ```
	     */
	    var URLSearchParams = (function () {
	        /**
	         * @param {?=} rawParams
	         * @param {?=} queryEncoder
	         */
	        function URLSearchParams(rawParams, queryEncoder) {
	            if (rawParams === void 0) { rawParams = ''; }
	            if (queryEncoder === void 0) { queryEncoder = new QueryEncoder(); }
	            this.rawParams = rawParams;
	            this.queryEncoder = queryEncoder;
	            this.paramsMap = paramParser(rawParams);
	        }
	        /**
	         * @return {?}
	         */
	        URLSearchParams.prototype.clone = function () {
	            var /** @type {?} */ clone = new URLSearchParams('', this.queryEncoder);
	            clone.appendAll(this);
	            return clone;
	        };
	        /**
	         * @param {?} param
	         * @return {?}
	         */
	        URLSearchParams.prototype.has = function (param) { return this.paramsMap.has(param); };
	        /**
	         * @param {?} param
	         * @return {?}
	         */
	        URLSearchParams.prototype.get = function (param) {
	            var /** @type {?} */ storedParam = this.paramsMap.get(param);
	            return Array.isArray(storedParam) ? storedParam[0] : null;
	        };
	        /**
	         * @param {?} param
	         * @return {?}
	         */
	        URLSearchParams.prototype.getAll = function (param) { return this.paramsMap.get(param) || []; };
	        /**
	         * @param {?} param
	         * @param {?} val
	         * @return {?}
	         */
	        URLSearchParams.prototype.set = function (param, val) {
	            if (val === void 0 || val === null) {
	                this.delete(param);
	                return;
	            }
	            var /** @type {?} */ list = this.paramsMap.get(param) || [];
	            list.length = 0;
	            list.push(val);
	            this.paramsMap.set(param, list);
	        };
	        /**
	         * @param {?} searchParams
	         * @return {?}
	         */
	        URLSearchParams.prototype.setAll = function (searchParams) {
	            var _this = this;
	            searchParams.paramsMap.forEach(function (value, param) {
	                var /** @type {?} */ list = _this.paramsMap.get(param) || [];
	                list.length = 0;
	                list.push(value[0]);
	                _this.paramsMap.set(param, list);
	            });
	        };
	        /**
	         * @param {?} param
	         * @param {?} val
	         * @return {?}
	         */
	        URLSearchParams.prototype.append = function (param, val) {
	            if (val === void 0 || val === null)
	                return;
	            var /** @type {?} */ list = this.paramsMap.get(param) || [];
	            list.push(val);
	            this.paramsMap.set(param, list);
	        };
	        /**
	         * @param {?} searchParams
	         * @return {?}
	         */
	        URLSearchParams.prototype.appendAll = function (searchParams) {
	            var _this = this;
	            searchParams.paramsMap.forEach(function (value, param) {
	                var /** @type {?} */ list = _this.paramsMap.get(param) || [];
	                for (var /** @type {?} */ i = 0; i < value.length; ++i) {
	                    list.push(value[i]);
	                }
	                _this.paramsMap.set(param, list);
	            });
	        };
	        /**
	         * @param {?} searchParams
	         * @return {?}
	         */
	        URLSearchParams.prototype.replaceAll = function (searchParams) {
	            var _this = this;
	            searchParams.paramsMap.forEach(function (value, param) {
	                var /** @type {?} */ list = _this.paramsMap.get(param) || [];
	                list.length = 0;
	                for (var /** @type {?} */ i = 0; i < value.length; ++i) {
	                    list.push(value[i]);
	                }
	                _this.paramsMap.set(param, list);
	            });
	        };
	        /**
	         * @return {?}
	         */
	        URLSearchParams.prototype.toString = function () {
	            var _this = this;
	            var /** @type {?} */ paramsList = [];
	            this.paramsMap.forEach(function (values, k) {
	                values.forEach(function (v) { return paramsList.push(_this.queryEncoder.encodeKey(k) + '=' + _this.queryEncoder.encodeValue(v)); });
	            });
	            return paramsList.join('&');
	        };
	        /**
	         * @param {?} param
	         * @return {?}
	         */
	        URLSearchParams.prototype.delete = function (param) { this.paramsMap.delete(param); };
	        return URLSearchParams;
	    }());
	
	    /**
	     *  HTTP request body used by both {@link Request} and {@link Response}
	      * https://fetch.spec.whatwg.org/#body
	     * @abstract
	     */
	    var Body = (function () {
	        function Body() {
	        }
	        /**
	         *  Attempts to return body as parsed `JSON` object, or raises an exception.
	         * @return {?}
	         */
	        Body.prototype.json = function () {
	            if (typeof this._body === 'string') {
	                return JSON.parse(/** @type {?} */ (this._body));
	            }
	            if (this._body instanceof ArrayBuffer) {
	                return JSON.parse(this.text());
	            }
	            return this._body;
	        };
	        /**
	         *  Returns the body as a string, presuming `toString()` can be called on the response body.
	         * @return {?}
	         */
	        Body.prototype.text = function () {
	            if (this._body instanceof URLSearchParams) {
	                return this._body.toString();
	            }
	            if (this._body instanceof ArrayBuffer) {
	                return String.fromCharCode.apply(null, new Uint16Array(/** @type {?} */ (this._body)));
	            }
	            if (this._body === null) {
	                return '';
	            }
	            if (typeof this._body === 'object') {
	                return JSON.stringify(this._body, null, 2);
	            }
	            return this._body.toString();
	        };
	        /**
	         *  Return the body as an ArrayBuffer
	         * @return {?}
	         */
	        Body.prototype.arrayBuffer = function () {
	            if (this._body instanceof ArrayBuffer) {
	                return (this._body);
	            }
	            return stringToArrayBuffer(this.text());
	        };
	        /**
	         *  Returns the request's body as a Blob, assuming that body exists.
	         * @return {?}
	         */
	        Body.prototype.blob = function () {
	            if (this._body instanceof Blob) {
	                return (this._body);
	            }
	            if (this._body instanceof ArrayBuffer) {
	                return new Blob([this._body]);
	            }
	            throw new Error('The request body isn\'t either a blob or an array buffer');
	        };
	        return Body;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$2 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     *  Creates `Response` instances from provided values.
	      * *
	      * Though this object isn't
	      * usually instantiated by end-users, it is the primary object interacted with when it comes time to
	      * add data to a view.
	      * *
	      * ### Example
	      * *
	      * ```
	      * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
	      * ```
	      * *
	      * The Response's interface is inspired by the Response constructor defined in the [Fetch
	      * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
	      * can be accessed many times. There are other differences in the implementation, but this is the
	      * most significant.
	      * *
	     */
	    var Response = (function (_super) {
	        __extends$2(Response, _super);
	        /**
	         * @param {?} responseOptions
	         */
	        function Response(responseOptions) {
	            _super.call(this);
	            this._body = responseOptions.body;
	            this.status = responseOptions.status;
	            this.ok = (this.status >= 200 && this.status <= 299);
	            this.statusText = responseOptions.statusText;
	            this.headers = responseOptions.headers;
	            this.type = responseOptions.type;
	            this.url = responseOptions.url;
	        }
	        /**
	         * @return {?}
	         */
	        Response.prototype.toString = function () {
	            return "Response with status: " + this.status + " " + this.statusText + " for URL: " + this.url;
	        };
	        return Response;
	    }(Body));
	
	    var /** @type {?} */ _nextRequestId = 0;
	    var /** @type {?} */ JSONP_HOME = '__ng_jsonp__';
	    var /** @type {?} */ _jsonpConnections = null;
	    /**
	     * @return {?}
	     */
	    function _getJsonpConnections() {
	        var /** @type {?} */ w = typeof window == 'object' ? window : {};
	        if (_jsonpConnections === null) {
	            _jsonpConnections = w[JSONP_HOME] = {};
	        }
	        return _jsonpConnections;
	    }
	    // Make sure not to evaluate this in a non-browser environment!
	    var BrowserJsonp = (function () {
	        function BrowserJsonp() {
	        }
	        /**
	         * @param {?} url
	         * @return {?}
	         */
	        BrowserJsonp.prototype.build = function (url) {
	            var /** @type {?} */ node = document.createElement('script');
	            node.src = url;
	            return node;
	        };
	        /**
	         * @return {?}
	         */
	        BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
	        /**
	         * @param {?} id
	         * @return {?}
	         */
	        BrowserJsonp.prototype.requestCallback = function (id) { return JSONP_HOME + "." + id + ".finished"; };
	        /**
	         * @param {?} id
	         * @param {?} connection
	         * @return {?}
	         */
	        BrowserJsonp.prototype.exposeConnection = function (id, connection) {
	            var /** @type {?} */ connections = _getJsonpConnections();
	            connections[id] = connection;
	        };
	        /**
	         * @param {?} id
	         * @return {?}
	         */
	        BrowserJsonp.prototype.removeConnection = function (id) {
	            var /** @type {?} */ connections = _getJsonpConnections();
	            connections[id] = null;
	        };
	        /**
	         * @param {?} node
	         * @return {?}
	         */
	        BrowserJsonp.prototype.send = function (node) { document.body.appendChild(/** @type {?} */ ((node))); };
	        /**
	         * @param {?} node
	         * @return {?}
	         */
	        BrowserJsonp.prototype.cleanup = function (node) {
	            if (node.parentNode) {
	                node.parentNode.removeChild(/** @type {?} */ ((node)));
	            }
	        };
	        BrowserJsonp.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        BrowserJsonp.ctorParameters = function () { return []; };
	        return BrowserJsonp;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    var /** @type {?} */ JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
	    var /** @type {?} */ JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
	    /**
	     *  Abstract base class for an in-flight JSONP request.
	      * *
	     * @abstract
	     */
	    var JSONPConnection = (function () {
	        function JSONPConnection() {
	        }
	        /**
	         *  Callback called when the JSONP request completes, to notify the application
	          * of the new data.
	         * @abstract
	         * @param {?=} data
	         * @return {?}
	         */
	        JSONPConnection.prototype.finished = function (data) { };
	        return JSONPConnection;
	    }());
	    var JSONPConnection_ = (function (_super) {
	        __extends(JSONPConnection_, _super);
	        /**
	         * @param {?} req
	         * @param {?} _dom
	         * @param {?=} baseResponseOptions
	         */
	        function JSONPConnection_(req, _dom, baseResponseOptions) {
	            var _this = this;
	            _super.call(this);
	            this._dom = _dom;
	            this.baseResponseOptions = baseResponseOptions;
	            this._finished = false;
	            if (req.method !== RequestMethod.Get) {
	                throw new TypeError(JSONP_ERR_WRONG_METHOD);
	            }
	            this.request = req;
	            this.response = new rxjs_Observable.Observable(function (responseObserver) {
	                _this.readyState = ReadyState.Loading;
	                var id = _this._id = _dom.nextRequestID();
	                _dom.exposeConnection(id, _this);
	                // Workaround Dart
	                // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
	                var callback = _dom.requestCallback(_this._id);
	                var url = req.url;
	                if (url.indexOf('=JSONP_CALLBACK&') > -1) {
	                    url = url.replace('=JSONP_CALLBACK&', "=" + callback + "&");
	                }
	                else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
	                    url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
	                }
	                var script = _this._script = _dom.build(url);
	                var onLoad = function (event) {
	                    if (_this.readyState === ReadyState.Cancelled)
	                        return;
	                    _this.readyState = ReadyState.Done;
	                    _dom.cleanup(script);
	                    if (!_this._finished) {
	                        var responseOptions_1 = new ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: ResponseType.Error, url: url });
	                        if (baseResponseOptions) {
	                            responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
	                        }
	                        responseObserver.error(new Response(responseOptions_1));
	                        return;
	                    }
	                    var responseOptions = new ResponseOptions({ body: _this._responseData, url: url });
	                    if (_this.baseResponseOptions) {
	                        responseOptions = _this.baseResponseOptions.merge(responseOptions);
	                    }
	                    responseObserver.next(new Response(responseOptions));
	                    responseObserver.complete();
	                };
	                var onError = function (error) {
	                    if (_this.readyState === ReadyState.Cancelled)
	                        return;
	                    _this.readyState = ReadyState.Done;
	                    _dom.cleanup(script);
	                    var responseOptions = new ResponseOptions({ body: error.message, type: ResponseType.Error });
	                    if (baseResponseOptions) {
	                        responseOptions = baseResponseOptions.merge(responseOptions);
	                    }
	                    responseObserver.error(new Response(responseOptions));
	                };
	                script.addEventListener('load', onLoad);
	                script.addEventListener('error', onError);
	                _dom.send(script);
	                return function () {
	                    _this.readyState = ReadyState.Cancelled;
	                    script.removeEventListener('load', onLoad);
	                    script.removeEventListener('error', onError);
	                    _this._dom.cleanup(script);
	                };
	            });
	        }
	        /**
	         * @param {?=} data
	         * @return {?}
	         */
	        JSONPConnection_.prototype.finished = function (data) {
	            // Don't leak connections
	            this._finished = true;
	            this._dom.removeConnection(this._id);
	            if (this.readyState === ReadyState.Cancelled)
	                return;
	            this._responseData = data;
	        };
	        return JSONPConnection_;
	    }(JSONPConnection));
	    /**
	     *  A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
	      * *
	     * @abstract
	     */
	    var JSONPBackend = (function (_super) {
	        __extends(JSONPBackend, _super);
	        function JSONPBackend() {
	            _super.apply(this, arguments);
	        }
	        return JSONPBackend;
	    }(ConnectionBackend));
	    var JSONPBackend_ = (function (_super) {
	        __extends(JSONPBackend_, _super);
	        /**
	         * @param {?} _browserJSONP
	         * @param {?} _baseResponseOptions
	         */
	        function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
	            _super.call(this);
	            this._browserJSONP = _browserJSONP;
	            this._baseResponseOptions = _baseResponseOptions;
	        }
	        /**
	         * @param {?} request
	         * @return {?}
	         */
	        JSONPBackend_.prototype.createConnection = function (request) {
	            return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
	        };
	        JSONPBackend_.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        JSONPBackend_.ctorParameters = function () { return [
	            { type: BrowserJsonp, },
	            { type: ResponseOptions, },
	        ]; };
	        return JSONPBackend_;
	    }(JSONPBackend));
	
	    var /** @type {?} */ XSSI_PREFIX = /^\)\]\}',?\n/;
	    /**
	     *  Creates connections using `XMLHttpRequest`. Given a fully-qualified
	      * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
	      * request.
	      * *
	      * This class would typically not be created or interacted with directly inside applications, though
	      * the {@link MockConnection} may be interacted with in tests.
	      * *
	     */
	    var XHRConnection = (function () {
	        /**
	         * @param {?} req
	         * @param {?} browserXHR
	         * @param {?=} baseResponseOptions
	         */
	        function XHRConnection(req, browserXHR, baseResponseOptions) {
	            var _this = this;
	            this.request = req;
	            this.response = new rxjs_Observable.Observable(function (responseObserver) {
	                var _xhr = browserXHR.build();
	                _xhr.open(RequestMethod[req.method].toUpperCase(), req.url);
	                if (req.withCredentials != null) {
	                    _xhr.withCredentials = req.withCredentials;
	                }
	                // load event handler
	                var onLoad = function () {
	                    // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
	                    var status = _xhr.status === 1223 ? 204 : _xhr.status;
	                    var body = null;
	                    // HTTP 204 means no content
	                    if (status !== 204) {
	                        // responseText is the old-school way of retrieving response (supported by IE8 & 9)
	                        // response/responseType properties were introduced in ResourceLoader Level2 spec
	                        // (supported by IE10)
	                        body = (typeof _xhr.response === 'undefined') ? _xhr.responseText : _xhr.response;
	                        // Implicitly strip a potential XSSI prefix.
	                        if (typeof body === 'string') {
	                            body = body.replace(XSSI_PREFIX, '');
	                        }
	                    }
	                    // fix status code when it is 0 (0 status is undocumented).
	                    // Occurs when accessing file resources or on Android 4.1 stock browser
	                    // while retrieving files from application cache.
	                    if (status === 0) {
	                        status = body ? 200 : 0;
	                    }
	                    var headers = Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
	                    // IE 9 does not provide the way to get URL of response
	                    var url = getResponseURL(_xhr) || req.url;
	                    var statusText = _xhr.statusText || 'OK';
	                    var responseOptions = new ResponseOptions({ body: body, status: status, headers: headers, statusText: statusText, url: url });
	                    if (baseResponseOptions != null) {
	                        responseOptions = baseResponseOptions.merge(responseOptions);
	                    }
	                    var response = new Response(responseOptions);
	                    response.ok = isSuccess(status);
	                    if (response.ok) {
	                        responseObserver.next(response);
	                        // TODO(gdi2290): defer complete if array buffer until done
	                        responseObserver.complete();
	                        return;
	                    }
	                    responseObserver.error(response);
	                };
	                // error event handler
	                var onError = function (err) {
	                    var responseOptions = new ResponseOptions({
	                        body: err,
	                        type: ResponseType.Error,
	                        status: _xhr.status,
	                        statusText: _xhr.statusText,
	                    });
	                    if (baseResponseOptions != null) {
	                        responseOptions = baseResponseOptions.merge(responseOptions);
	                    }
	                    responseObserver.error(new Response(responseOptions));
	                };
	                _this.setDetectedContentType(req, _xhr);
	                if (req.headers == null) {
	                    req.headers = new Headers();
	                }
	                if (!req.headers.has('Accept')) {
	                    req.headers.append('Accept', 'application/json, text/plain, */*');
	                }
	                req.headers.forEach(function (values, name) { return _xhr.setRequestHeader(name, values.join(',')); });
	                // Select the correct buffer type to store the response
	                if (req.responseType != null && _xhr.responseType != null) {
	                    switch (req.responseType) {
	                        case ResponseContentType.ArrayBuffer:
	                            _xhr.responseType = 'arraybuffer';
	                            break;
	                        case ResponseContentType.Json:
	                            _xhr.responseType = 'json';
	                            break;
	                        case ResponseContentType.Text:
	                            _xhr.responseType = 'text';
	                            break;
	                        case ResponseContentType.Blob:
	                            _xhr.responseType = 'blob';
	                            break;
	                        default:
	                            throw new Error('The selected responseType is not supported');
	                    }
	                }
	                _xhr.addEventListener('load', onLoad);
	                _xhr.addEventListener('error', onError);
	                _xhr.send(_this.request.getBody());
	                return function () {
	                    _xhr.removeEventListener('load', onLoad);
	                    _xhr.removeEventListener('error', onError);
	                    _xhr.abort();
	                };
	            });
	        }
	        /**
	         * @param {?} req
	         * @param {?} _xhr
	         * @return {?}
	         */
	        XHRConnection.prototype.setDetectedContentType = function (req /** TODO Request */, _xhr /** XMLHttpRequest */) {
	            // Skip if a custom Content-Type header is provided
	            if (req.headers != null && req.headers.get('Content-Type') != null) {
	                return;
	            }
	            // Set the detected content type
	            switch (req.contentType) {
	                case ContentType.NONE:
	                    break;
	                case ContentType.JSON:
	                    _xhr.setRequestHeader('content-type', 'application/json');
	                    break;
	                case ContentType.FORM:
	                    _xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	                    break;
	                case ContentType.TEXT:
	                    _xhr.setRequestHeader('content-type', 'text/plain');
	                    break;
	                case ContentType.BLOB:
	                    var /** @type {?} */ blob = req.blob();
	                    if (blob.type) {
	                        _xhr.setRequestHeader('content-type', blob.type);
	                    }
	                    break;
	            }
	        };
	        return XHRConnection;
	    }());
	    /**
	     *  `XSRFConfiguration` sets up Cross Site Request Forgery (XSRF) protection for the application
	      * using a cookie. See {@link https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)}
	      * for more information on XSRF.
	      * *
	      * Applications can configure custom cookie and header names by binding an instance of this class
	      * with different `cookieName` and `headerName` values. See the main HTTP documentation for more
	      * details.
	      * *
	     */
	    var CookieXSRFStrategy = (function () {
	        /**
	         * @param {?=} _cookieName
	         * @param {?=} _headerName
	         */
	        function CookieXSRFStrategy(_cookieName, _headerName) {
	            if (_cookieName === void 0) { _cookieName = 'XSRF-TOKEN'; }
	            if (_headerName === void 0) { _headerName = 'X-XSRF-TOKEN'; }
	            this._cookieName = _cookieName;
	            this._headerName = _headerName;
	        }
	        /**
	         * @param {?} req
	         * @return {?}
	         */
	        CookieXSRFStrategy.prototype.configureRequest = function (req) {
	            var /** @type {?} */ xsrfToken = _angular_platformBrowser.__platform_browser_private__.getDOM().getCookie(this._cookieName);
	            if (xsrfToken) {
	                req.headers.set(this._headerName, xsrfToken);
	            }
	        };
	        return CookieXSRFStrategy;
	    }());
	    /**
	     *  Creates {@link XHRConnection} instances.
	      * *
	      * This class would typically not be used by end users, but could be
	      * overridden if a different backend implementation should be used,
	      * such as in a node backend.
	      * *
	      * ### Example
	      * *
	      * ```
	      * import {Http, MyNodeBackend, HTTP_PROVIDERS, BaseRequestOptions} from '@angular/http';
	      * viewProviders: [
	      * HTTP_PROVIDERS,
	      * {provide: Http, useFactory: (backend, options) => {
	      * return new Http(backend, options);
	      * }, deps: [MyNodeBackend, BaseRequestOptions]}]
	      * })
	      * class MyComponent {
	      * constructor(http:Http) {
	      * http.request('people.json').subscribe(res => this.people = res.json());
	      * }
	      * }
	      * ```
	     */
	    var XHRBackend = (function () {
	        /**
	         * @param {?} _browserXHR
	         * @param {?} _baseResponseOptions
	         * @param {?} _xsrfStrategy
	         */
	        function XHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) {
	            this._browserXHR = _browserXHR;
	            this._baseResponseOptions = _baseResponseOptions;
	            this._xsrfStrategy = _xsrfStrategy;
	        }
	        /**
	         * @param {?} request
	         * @return {?}
	         */
	        XHRBackend.prototype.createConnection = function (request) {
	            this._xsrfStrategy.configureRequest(request);
	            return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
	        };
	        XHRBackend.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        XHRBackend.ctorParameters = function () { return [
	            { type: BrowserXhr, },
	            { type: ResponseOptions, },
	            { type: XSRFStrategy, },
	        ]; };
	        return XHRBackend;
	    }());
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$3 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     *  Creates a request options object to be optionally provided when instantiating a
	      * {@link Request}.
	      * *
	      * This class is based on the `RequestInit` description in the [Fetch
	      * Spec](https://fetch.spec.whatwg.org/#requestinit).
	      * *
	      * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
	      * class, which sub-classes `RequestOptions`.
	      * *
	      * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
	      * *
	      * ```typescript
	      * import {RequestOptions, Request, RequestMethod} from '@angular/http';
	      * *
	      * var options = new RequestOptions({
	      * method: RequestMethod.Post,
	      * url: 'https://google.com'
	      * });
	      * var req = new Request(options);
	      * console.log('req.method:', RequestMethod[req.method]); // Post
	      * console.log('options.url:', options.url); // https://google.com
	      * ```
	      * *
	     */
	    var RequestOptions = (function () {
	        /**
	         * @param {?=} __0
	         */
	        function RequestOptions(_a) {
	            var _b = _a === void 0 ? {} : _a, method = _b.method, headers = _b.headers, body = _b.body, url = _b.url, search = _b.search, withCredentials = _b.withCredentials, responseType = _b.responseType;
	            this.method = method != null ? normalizeMethodName(method) : null;
	            this.headers = headers != null ? headers : null;
	            this.body = body != null ? body : null;
	            this.url = url != null ? url : null;
	            this.search =
	                search != null ? (typeof search === 'string' ? new URLSearchParams(search) : search) : null;
	            this.withCredentials = withCredentials != null ? withCredentials : null;
	            this.responseType = responseType != null ? responseType : null;
	        }
	        /**
	         *  Creates a copy of the `RequestOptions` instance, using the optional input as values to override
	          * existing values. This method will not change the values of the instance on which it is being
	          * called.
	          * *
	          * Note that `headers` and `search` will override existing values completely if present in
	          * the `options` object. If these values should be merged, it should be done prior to calling
	          * `merge` on the `RequestOptions` instance.
	          * *
	          * ### Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview))
	          * *
	          * ```typescript
	          * import {RequestOptions, Request, RequestMethod} from '@angular/http';
	          * *
	          * var options = new RequestOptions({
	          * method: RequestMethod.Post
	          * });
	          * var req = new Request(options.merge({
	          * url: 'https://google.com'
	          * }));
	          * console.log('req.method:', RequestMethod[req.method]); // Post
	          * console.log('options.url:', options.url); // null
	          * console.log('req.url:', req.url); // https://google.com
	          * ```
	         * @param {?=} options
	         * @return {?}
	         */
	        RequestOptions.prototype.merge = function (options) {
	            return new RequestOptions({
	                method: options && options.method != null ? options.method : this.method,
	                headers: options && options.headers != null ? options.headers : this.headers,
	                body: options && options.body != null ? options.body : this.body,
	                url: options && options.url != null ? options.url : this.url,
	                search: options && options.search != null ?
	                    (typeof options.search === 'string' ? new URLSearchParams(options.search) :
	                        options.search.clone()) :
	                    this.search,
	                withCredentials: options && options.withCredentials != null ? options.withCredentials :
	                    this.withCredentials,
	                responseType: options && options.responseType != null ? options.responseType :
	                    this.responseType
	            });
	        };
	        return RequestOptions;
	    }());
	    /**
	     *  Subclass of {@link RequestOptions}, with default values.
	      * *
	      * Default values:
	      * * method: {@link RequestMethod RequestMethod.Get}
	      * * headers: empty {@link Headers} object
	      * *
	      * This class could be extended and bound to the {@link RequestOptions} class
	      * when configuring an {@link Injector}, in order to override the default options
	      * used by {@link Http} to create and send {@link Request Requests}.
	      * *
	      * ### Example ([live demo](http://plnkr.co/edit/LEKVSx?p=preview))
	      * *
	      * ```typescript
	      * import {provide} from '@angular/core';
	      * import {bootstrap} from '@angular/platform-browser/browser';
	      * import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions} from '@angular/http';
	      * import {App} from './myapp';
	      * *
	      * class MyOptions extends BaseRequestOptions {
	      * search: string = 'coreTeam=true';
	      * }
	      * *
	      * bootstrap(App, [HTTP_PROVIDERS, {provide: RequestOptions, useClass: MyOptions}]);
	      * ```
	      * *
	      * The options could also be extended when manually creating a {@link Request}
	      * object.
	      * *
	      * ### Example ([live demo](http://plnkr.co/edit/oyBoEvNtDhOSfi9YxaVb?p=preview))
	      * *
	      * ```
	      * import {BaseRequestOptions, Request, RequestMethod} from '@angular/http';
	      * *
	      * var options = new BaseRequestOptions();
	      * var req = new Request(options.merge({
	      * method: RequestMethod.Post,
	      * url: 'https://google.com'
	      * }));
	      * console.log('req.method:', RequestMethod[req.method]); // Post
	      * console.log('options.url:', options.url); // null
	      * console.log('req.url:', req.url); // https://google.com
	      * ```
	      * *
	     */
	    var BaseRequestOptions = (function (_super) {
	        __extends$3(BaseRequestOptions, _super);
	        function BaseRequestOptions() {
	            _super.call(this, { method: RequestMethod.Get, headers: new Headers() });
	        }
	        BaseRequestOptions.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        BaseRequestOptions.ctorParameters = function () { return []; };
	        return BaseRequestOptions;
	    }(RequestOptions));
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$5 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     *  Creates `Request` instances from provided values.
	      * *
	      * The Request's interface is inspired by the Request constructor defined in the [Fetch
	      * Spec](https://fetch.spec.whatwg.org/#request-class),
	      * but is considered a static value whose body can be accessed many times. There are other
	      * differences in the implementation, but this is the most significant.
	      * *
	      * `Request` instances are typically created by higher-level classes, like {@link Http} and
	      * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
	      * One such example is when creating services that wrap higher-level services, like {@link Http},
	      * where it may be useful to generate a `Request` with arbitrary headers and search params.
	      * *
	      * ```typescript
	      * import {Injectable, Injector} from '@angular/core';
	      * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
	      * *
	      * class AutoAuthenticator {
	      * constructor(public http:Http) {}
	      * request(url:string) {
	      * return this.http.request(new Request({
	      * method: RequestMethod.Get,
	      * url: url,
	      * search: 'password=123'
	      * }));
	      * }
	      * }
	      * *
	      * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
	      * var authenticator = injector.get(AutoAuthenticator);
	      * authenticator.request('people.json').subscribe(res => {
	      * //URL should have included '?password=123'
	      * console.log('people', res.json());
	      * });
	      * ```
	      * *
	     */
	    var Request = (function (_super) {
	        __extends$5(Request, _super);
	        /**
	         * @param {?} requestOptions
	         */
	        function Request(requestOptions) {
	            _super.call(this);
	            // TODO: assert that url is present
	            var url = requestOptions.url;
	            this.url = requestOptions.url;
	            if (requestOptions.search) {
	                var search = requestOptions.search.toString();
	                if (search.length > 0) {
	                    var prefix = '?';
	                    if (this.url.indexOf('?') != -1) {
	                        prefix = (this.url[this.url.length - 1] == '&') ? '' : '&';
	                    }
	                    // TODO: just delete search-query-looking string in url?
	                    this.url = url + prefix + search;
	                }
	            }
	            this._body = requestOptions.body;
	            this.method = normalizeMethodName(requestOptions.method);
	            // TODO(jeffbcross): implement behavior
	            // Defaults to 'omit', consistent with browser
	            this.headers = new Headers(requestOptions.headers);
	            this.contentType = this.detectContentType();
	            this.withCredentials = requestOptions.withCredentials;
	            this.responseType = requestOptions.responseType;
	        }
	        /**
	         *  Returns the content type enum based on header options.
	         * @return {?}
	         */
	        Request.prototype.detectContentType = function () {
	            switch (this.headers.get('content-type')) {
	                case 'application/json':
	                    return ContentType.JSON;
	                case 'application/x-www-form-urlencoded':
	                    return ContentType.FORM;
	                case 'multipart/form-data':
	                    return ContentType.FORM_DATA;
	                case 'text/plain':
	                case 'text/html':
	                    return ContentType.TEXT;
	                case 'application/octet-stream':
	                    return ContentType.BLOB;
	                default:
	                    return this.detectContentTypeFromBody();
	            }
	        };
	        /**
	         *  Returns the content type of request's body based on its type.
	         * @return {?}
	         */
	        Request.prototype.detectContentTypeFromBody = function () {
	            if (this._body == null) {
	                return ContentType.NONE;
	            }
	            else if (this._body instanceof URLSearchParams) {
	                return ContentType.FORM;
	            }
	            else if (this._body instanceof FormData) {
	                return ContentType.FORM_DATA;
	            }
	            else if (this._body instanceof Blob$1) {
	                return ContentType.BLOB;
	            }
	            else if (this._body instanceof ArrayBuffer$1) {
	                return ContentType.ARRAY_BUFFER;
	            }
	            else if (this._body && typeof this._body == 'object') {
	                return ContentType.JSON;
	            }
	            else {
	                return ContentType.TEXT;
	            }
	        };
	        /**
	         *  Returns the request's body according to its type. If body is undefined, return
	          * null.
	         * @return {?}
	         */
	        Request.prototype.getBody = function () {
	            switch (this.contentType) {
	                case ContentType.JSON:
	                    return this.text();
	                case ContentType.FORM:
	                    return this.text();
	                case ContentType.FORM_DATA:
	                    return this._body;
	                case ContentType.TEXT:
	                    return this.text();
	                case ContentType.BLOB:
	                    return this.blob();
	                case ContentType.ARRAY_BUFFER:
	                    return this.arrayBuffer();
	                default:
	                    return null;
	            }
	        };
	        return Request;
	    }(Body));
	    var /** @type {?} */ noop = function () { };
	    var /** @type {?} */ w = typeof window == 'object' ? window : noop;
	    var /** @type {?} */ FormData = ((w) /** TODO #9100 */)['FormData'] || noop;
	    var /** @type {?} */ Blob$1 = ((w) /** TODO #9100 */)['Blob'] || noop;
	    var /** @type {?} */ ArrayBuffer$1 = ((w) /** TODO #9100 */)['ArrayBuffer'] || noop;
	
	    /**
	     * @license
	     * Copyright Google Inc. All Rights Reserved.
	     *
	     * Use of this source code is governed by an MIT-style license that can be
	     * found in the LICENSE file at https://angular.io/license
	     */
	    var __extends$4 = (this && this.__extends) || function (d, b) {
	        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	    /**
	     * @param {?} backend
	     * @param {?} request
	     * @return {?}
	     */
	    function httpRequest(backend, request) {
	        return backend.createConnection(request).response;
	    }
	    /**
	     * @param {?} defaultOpts
	     * @param {?} providedOpts
	     * @param {?} method
	     * @param {?} url
	     * @return {?}
	     */
	    function mergeOptions(defaultOpts, providedOpts, method, url) {
	        var /** @type {?} */ newOptions = defaultOpts;
	        if (providedOpts) {
	            // Hack so Dart can used named parameters
	            return newOptions.merge(new RequestOptions({
	                method: providedOpts.method || method,
	                url: providedOpts.url || url,
	                search: providedOpts.search,
	                headers: providedOpts.headers,
	                body: providedOpts.body,
	                withCredentials: providedOpts.withCredentials,
	                responseType: providedOpts.responseType
	            }));
	        }
	        return newOptions.merge(new RequestOptions({ method: method, url: url }));
	    }
	    /**
	     *  Performs http requests using `XMLHttpRequest` as the default backend.
	      * *
	      * `Http` is available as an injectable class, with methods to perform http requests. Calling
	      * `request` returns an `Observable` which will emit a single {@link Response} when a
	      * response is received.
	      * *
	      * ### Example
	      * *
	      * ```typescript
	      * import {Http, HTTP_PROVIDERS} from '@angular/http';
	      * import 'rxjs/add/operator/map'
	      * selector: 'http-app',
	      * viewProviders: [HTTP_PROVIDERS],
	      * templateUrl: 'people.html'
	      * })
	      * class PeopleComponent {
	      * constructor(http: Http) {
	      * http.get('people.json')
	      * // Call map on the response observable to get the parsed people object
	      * .map(res => res.json())
	      * // Subscribe to the observable to get the parsed people object and attach it to the
	      * // component
	      * .subscribe(people => this.people = people);
	      * }
	      * }
	      * ```
	      * *
	      * *
	      * ### Example
	      * *
	      * ```
	      * http.get('people.json').subscribe((res:Response) => this.people = res.json());
	      * ```
	      * *
	      * The default construct used to perform requests, `XMLHttpRequest`, is abstracted as a "Backend" (
	      * {@link XHRBackend} in this case), which could be mocked with dependency injection by replacing
	      * the {@link XHRBackend} provider, as in the following example:
	      * *
	      * ### Example
	      * *
	      * ```typescript
	      * import {BaseRequestOptions, Http} from '@angular/http';
	      * import {MockBackend} from '@angular/http/testing';
	      * var injector = Injector.resolveAndCreate([
	      * BaseRequestOptions,
	      * MockBackend,
	      * {provide: Http, useFactory:
	      * function(backend, defaultOptions) {
	      * return new Http(backend, defaultOptions);
	      * },
	      * deps: [MockBackend, BaseRequestOptions]}
	      * ]);
	      * var http = injector.get(Http);
	      * http.get('request-from-mock-backend.json').subscribe((res:Response) => doSomething(res));
	      * ```
	      * *
	     */
	    var Http = (function () {
	        /**
	         * @param {?} _backend
	         * @param {?} _defaultOptions
	         */
	        function Http(_backend, _defaultOptions) {
	            this._backend = _backend;
	            this._defaultOptions = _defaultOptions;
	        }
	        /**
	         *  Performs any type of http request. First argument is required, and can either be a url or
	          * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
	          * object can be provided as the 2nd argument. The options object will be merged with the values
	          * of {@link BaseRequestOptions} before performing the request.
	         * @param {?} url
	         * @param {?=} options
	         * @return {?}
	         */
	        Http.prototype.request = function (url, options) {
	            var /** @type {?} */ responseObservable;
	            if (typeof url === 'string') {
	                responseObservable = httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, /** @type {?} */ (url))));
	            }
	            else if (url instanceof Request) {
	                responseObservable = httpRequest(this._backend, url);
	            }
	            else {
	                throw new Error('First argument must be a url string or Request instance.');
	            }
	            return responseObservable;
	        };
	        /**
	         *  Performs a request with `get` http method.
	         * @param {?} url
	         * @param {?=} options
	         * @return {?}
	         */
	        Http.prototype.get = function (url, options) {
	            return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, url)));
	        };
	        /**
	         *  Performs a request with `post` http method.
	         * @param {?} url
	         * @param {?} body
	         * @param {?=} options
	         * @return {?}
	         */
	        Http.prototype.post = function (url, body, options) {
	            return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Post, url)));
	        };
	        /**
	         *  Performs a request with `put` http method.
	         * @param {?} url
	         * @param {?} body
	         * @param {?=} options
	         * @return {?}
	         */
	        Http.prototype.put = function (url, body, options) {
	            return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Put, url)));
	        };
	        /**
	         *  Performs a request with `delete` http method.
	         * @param {?} url
	         * @param {?=} options
	         * @return {?}
	         */
	        Http.prototype.delete = function (url, options) {
	            return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Delete, url)));
	        };
	        /**
	         *  Performs a request with `patch` http method.
	         * @param {?} url
	         * @param {?} body
	         * @param {?=} options
	         * @return {?}
	         */
	        Http.prototype.patch = function (url, body, options) {
	            return this.request(new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({ body: body })), options, RequestMethod.Patch, url)));
	        };
	        /**
	         *  Performs a request with `head` http method.
	         * @param {?} url
	         * @param {?=} options
	         * @return {?}
	         */
	        Http.prototype.head = function (url, options) {
	            return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Head, url)));
	        };
	        /**
	         *  Performs a request with `options` http method.
	         * @param {?} url
	         * @param {?=} options
	         * @return {?}
	         */
	        Http.prototype.options = function (url, options) {
	            return this.request(new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Options, url)));
	        };
	        Http.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        Http.ctorParameters = function () { return [
	            { type: ConnectionBackend, },
	            { type: RequestOptions, },
	        ]; };
	        return Http;
	    }());
	    /**
	     * @experimental
	     */
	    var Jsonp = (function (_super) {
	        __extends$4(Jsonp, _super);
	        /**
	         * @param {?} backend
	         * @param {?} defaultOptions
	         */
	        function Jsonp(backend, defaultOptions) {
	            _super.call(this, backend, defaultOptions);
	        }
	        /**
	         *  Performs any type of http request. First argument is required, and can either be a url or
	          * a {@link Request} instance. If the first argument is a url, an optional {@link RequestOptions}
	          * object can be provided as the 2nd argument. The options object will be merged with the values
	          * of {@link BaseRequestOptions} before performing the request.
	          * *
	          * supported by all current browsers. Because JSONP creates a `<script>` element with
	          * contents retrieved from a remote source, attacker-controlled data introduced by an untrusted
	          * source could expose your application to XSS risks. Data exposed by JSONP may also be
	          * readable by malicious third-party websites. In addition, JSONP introduces potential risk for
	          * future security issues (e.g. content sniffing).  For more detail, see the
	          * [Security Guide](http://g.co/ng/security).
	         * @param {?} url
	         * @param {?=} options
	         * @return {?}
	         */
	        Jsonp.prototype.request = function (url, options) {
	            var /** @type {?} */ responseObservable;
	            if (typeof url === 'string') {
	                url =
	                    new Request(mergeOptions(this._defaultOptions, options, RequestMethod.Get, /** @type {?} */ (url)));
	            }
	            if (url instanceof Request) {
	                if (url.method !== RequestMethod.Get) {
	                    throw new Error('JSONP requests must use GET request method.');
	                }
	                responseObservable = httpRequest(this._backend, url);
	            }
	            else {
	                throw new Error('First argument must be a url string or Request instance.');
	            }
	            return responseObservable;
	        };
	        Jsonp.decorators = [
	            { type: _angular_core.Injectable },
	        ];
	        /** @nocollapse */
	        Jsonp.ctorParameters = function () { return [
	            { type: ConnectionBackend, },
	            { type: RequestOptions, },
	        ]; };
	        return Jsonp;
	    }(Http));
	
	    /**
	     * @return {?}
	     */
	    function _createDefaultCookieXSRFStrategy() {
	        return new CookieXSRFStrategy();
	    }
	    /**
	     * @param {?} xhrBackend
	     * @param {?} requestOptions
	     * @return {?}
	     */
	    function httpFactory(xhrBackend, requestOptions) {
	        return new Http(xhrBackend, requestOptions);
	    }
	    /**
	     * @param {?} jsonpBackend
	     * @param {?} requestOptions
	     * @return {?}
	     */
	    function jsonpFactory(jsonpBackend, requestOptions) {
	        return new Jsonp(jsonpBackend, requestOptions);
	    }
	    /**
	     *  The module that includes http's providers
	      * *
	     */
	    var HttpModule = (function () {
	        function HttpModule() {
	        }
	        HttpModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        providers: [
	                            // TODO(pascal): use factory type annotations once supported in DI
	                            // issue: https://github.com/angular/angular/issues/3183
	                            { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] },
	                            BrowserXhr,
	                            { provide: RequestOptions, useClass: BaseRequestOptions },
	                            { provide: ResponseOptions, useClass: BaseResponseOptions },
	                            XHRBackend,
	                            { provide: XSRFStrategy, useFactory: _createDefaultCookieXSRFStrategy },
	                        ],
	                    },] },
	        ];
	        /** @nocollapse */
	        HttpModule.ctorParameters = function () { return []; };
	        return HttpModule;
	    }());
	    /**
	     *  The module that includes jsonp's providers
	      * *
	     */
	    var JsonpModule = (function () {
	        function JsonpModule() {
	        }
	        JsonpModule.decorators = [
	            { type: _angular_core.NgModule, args: [{
	                        providers: [
	                            // TODO(pascal): use factory type annotations once supported in DI
	                            // issue: https://github.com/angular/angular/issues/3183
	                            { provide: Jsonp, useFactory: jsonpFactory, deps: [JSONPBackend, RequestOptions] },
	                            BrowserJsonp,
	                            { provide: RequestOptions, useClass: BaseRequestOptions },
	                            { provide: ResponseOptions, useClass: BaseResponseOptions },
	                            { provide: JSONPBackend, useClass: JSONPBackend_ },
	                        ],
	                    },] },
	        ];
	        /** @nocollapse */
	        JsonpModule.ctorParameters = function () { return []; };
	        return JsonpModule;
	    }());
	
	    /**
	     * @stable
	     */
	    var /** @type {?} */ VERSION = new _angular_core.Version('2.3.0');
	
	    exports.BrowserXhr = BrowserXhr;
	    exports.JSONPBackend = JSONPBackend;
	    exports.JSONPConnection = JSONPConnection;
	    exports.CookieXSRFStrategy = CookieXSRFStrategy;
	    exports.XHRBackend = XHRBackend;
	    exports.XHRConnection = XHRConnection;
	    exports.BaseRequestOptions = BaseRequestOptions;
	    exports.RequestOptions = RequestOptions;
	    exports.BaseResponseOptions = BaseResponseOptions;
	    exports.ResponseOptions = ResponseOptions;
	    exports.ReadyState = ReadyState;
	    exports.RequestMethod = RequestMethod;
	    exports.ResponseContentType = ResponseContentType;
	    exports.ResponseType = ResponseType;
	    exports.Headers = Headers;
	    exports.Http = Http;
	    exports.Jsonp = Jsonp;
	    exports.HttpModule = HttpModule;
	    exports.JsonpModule = JsonpModule;
	    exports.Connection = Connection;
	    exports.ConnectionBackend = ConnectionBackend;
	    exports.XSRFStrategy = XSRFStrategy;
	    exports.Request = Request;
	    exports.Response = Response;
	    exports.QueryEncoder = QueryEncoder;
	    exports.URLSearchParams = URLSearchParams;
	    exports.VERSION = VERSION;
	
	}));

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @license Angular v3.3.0
	 * (c) 2010-2016 Google, Inc. https://angular.io/
	 * License: MIT
	 */(function (global, factory) {
	   true ? factory(exports, __webpack_require__(22), __webpack_require__(3), __webpack_require__(34), __webpack_require__(4), __webpack_require__(35), __webpack_require__(47), __webpack_require__(48), __webpack_require__(53), __webpack_require__(54), __webpack_require__(56), __webpack_require__(49), __webpack_require__(57), __webpack_require__(5), __webpack_require__(58), __webpack_require__(59), __webpack_require__(55), __webpack_require__(26), __webpack_require__(61), __webpack_require__(60), __webpack_require__(21), __webpack_require__(62)) :
	  typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', 'rxjs/BehaviorSubject', 'rxjs/Subject', 'rxjs/observable/from', 'rxjs/observable/of', 'rxjs/operator/concatMap', 'rxjs/operator/every', 'rxjs/operator/first', 'rxjs/operator/map', 'rxjs/operator/mergeMap', 'rxjs/operator/reduce', 'rxjs/Observable', 'rxjs/operator/catch', 'rxjs/operator/concatAll', 'rxjs/util/EmptyError', 'rxjs/observable/fromPromise', 'rxjs/operator/last', 'rxjs/operator/mergeAll', '@angular/platform-browser', 'rxjs/operator/filter'], factory) :
	  (factory((global.ng = global.ng || {}, global.ng.router = global.ng.router || {}),global.ng.common,global.ng.core,global.Rx,global.Rx,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.ng.platformBrowser,global.Rx.Observable.prototype));
	}(this, function (exports,_angular_common,_angular_core,rxjs_BehaviorSubject,rxjs_Subject,rxjs_observable_from,rxjs_observable_of,rxjs_operator_concatMap,rxjs_operator_every,rxjs_operator_first,rxjs_operator_map,rxjs_operator_mergeMap,rxjs_operator_reduce,rxjs_Observable,rxjs_operator_catch,rxjs_operator_concatAll,rxjs_util_EmptyError,rxjs_observable_fromPromise,l,rxjs_operator_mergeAll,_angular_platformBrowser,rxjs_operator_filter) { 'use strict';
	
	  /**
	   * @license
	   * Copyright Google Inc. All Rights Reserved.
	   *
	   * Use of this source code is governed by an MIT-style license that can be
	   * found in the LICENSE file at https://angular.io/license
	   */
	  var __extends = (this && this.__extends) || function (d, b) {
	      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	      function __() { this.constructor = d; }
	      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	  };
	  /**
	   * @whatItDoes Name of the primary outlet.
	   *
	   * @stable
	   */
	  var /** @type {?} */ PRIMARY_OUTLET = 'primary';
	  var NavigationCancelingError = (function (_super) {
	      __extends(NavigationCancelingError, _super);
	      /**
	       * @param {?} message
	       */
	      function NavigationCancelingError(message) {
	          _super.call(this, message);
	          this.message = message;
	          this.stack = (new Error(message)).stack;
	      }
	      /**
	       * @return {?}
	       */
	      NavigationCancelingError.prototype.toString = function () { return this.message; };
	      return NavigationCancelingError;
	  }(Error));
	  /**
	   * @param {?} segments
	   * @param {?} segmentGroup
	   * @param {?} route
	   * @return {?}
	   */
	  function defaultUrlMatcher(segments, segmentGroup, route) {
	      var /** @type {?} */ path = route.path;
	      var /** @type {?} */ parts = path.split('/');
	      var /** @type {?} */ posParams = {};
	      var /** @type {?} */ consumed = [];
	      var /** @type {?} */ currentIndex = 0;
	      for (var /** @type {?} */ i = 0; i < parts.length; ++i) {
	          if (currentIndex >= segments.length)
	              return null;
	          var /** @type {?} */ current = segments[currentIndex];
	          var /** @type {?} */ p = parts[i];
	          var /** @type {?} */ isPosParam = p.startsWith(':');
	          if (!isPosParam && p !== current.path)
	              return null;
	          if (isPosParam) {
	              posParams[p.substring(1)] = current;
	          }
	          consumed.push(current);
	          currentIndex++;
	      }
	      if (route.pathMatch === 'full' &&
	          (segmentGroup.hasChildren() || currentIndex < segments.length)) {
	          return null;
	      }
	      else {
	          return { consumed: consumed, posParams: posParams };
	      }
	  }
	
	  /**
	   * @param {?} a
	   * @param {?} b
	   * @return {?}
	   */
	  function shallowEqualArrays(a, b) {
	      if (a.length !== b.length)
	          return false;
	      for (var /** @type {?} */ i = 0; i < a.length; ++i) {
	          if (!shallowEqual(a[i], b[i]))
	              return false;
	      }
	      return true;
	  }
	  /**
	   * @param {?} a
	   * @param {?} b
	   * @return {?}
	   */
	  function shallowEqual(a, b) {
	      var /** @type {?} */ k1 = Object.keys(a);
	      var /** @type {?} */ k2 = Object.keys(b);
	      if (k1.length != k2.length) {
	          return false;
	      }
	      var /** @type {?} */ key;
	      for (var /** @type {?} */ i = 0; i < k1.length; i++) {
	          key = k1[i];
	          if (a[key] !== b[key]) {
	              return false;
	          }
	      }
	      return true;
	  }
	  /**
	   * @param {?} a
	   * @return {?}
	   */
	  function flatten(a) {
	      var /** @type {?} */ target = [];
	      for (var /** @type {?} */ i = 0; i < a.length; ++i) {
	          for (var /** @type {?} */ j = 0; j < a[i].length; ++j) {
	              target.push(a[i][j]);
	          }
	      }
	      return target;
	  }
	  /**
	   * @param {?} a
	   * @return {?}
	   */
	  function last(a) {
	      return a.length > 0 ? a[a.length - 1] : null;
	  }
	  /**
	   * @param {?} m1
	   * @param {?} m2
	   * @return {?}
	   */
	  function merge(m1, m2) {
	      var /** @type {?} */ m = {};
	      for (var attr in m1) {
	          if (m1.hasOwnProperty(attr)) {
	              m[attr] = m1[attr];
	          }
	      }
	      for (var attr in m2) {
	          if (m2.hasOwnProperty(attr)) {
	              m[attr] = m2[attr];
	          }
	      }
	      return m;
	  }
	  /**
	   * @param {?} map
	   * @param {?} callback
	   * @return {?}
	   */
	  function forEach(map, callback) {
	      for (var prop in map) {
	          if (map.hasOwnProperty(prop)) {
	              callback(map[prop], prop);
	          }
	      }
	  }
	  /**
	   * @param {?} obj
	   * @param {?} fn
	   * @return {?}
	   */
	  function waitForMap(obj, fn) {
	      var /** @type {?} */ waitFor = [];
	      var /** @type {?} */ res = {};
	      forEach(obj, function (a, k) {
	          if (k === PRIMARY_OUTLET) {
	              waitFor.push(rxjs_operator_map.map.call(fn(k, a), function (_) {
	                  res[k] = _;
	                  return _;
	              }));
	          }
	      });
	      forEach(obj, function (a, k) {
	          if (k !== PRIMARY_OUTLET) {
	              waitFor.push(rxjs_operator_map.map.call(fn(k, a), function (_) {
	                  res[k] = _;
	                  return _;
	              }));
	          }
	      });
	      if (waitFor.length > 0) {
	          var /** @type {?} */ concatted$ = rxjs_operator_concatAll.concatAll.call(rxjs_observable_of.of.apply(void 0, waitFor));
	          var /** @type {?} */ last$ = l.last.call(concatted$);
	          return rxjs_operator_map.map.call(last$, function () { return res; });
	      }
	      else {
	          return rxjs_observable_of.of(res);
	      }
	  }
	  /**
	   * @param {?} observables
	   * @return {?}
	   */
	  function andObservables(observables) {
	      var /** @type {?} */ merged$ = rxjs_operator_mergeAll.mergeAll.call(observables);
	      return rxjs_operator_every.every.call(merged$, function (result) { return result === true; });
	  }
	  /**
	   * @param {?} value
	   * @return {?}
	   */
	  function wrapIntoObservable(value) {
	      if (value instanceof rxjs_Observable.Observable) {
	          return value;
	      }
	      else if (value instanceof Promise) {
	          return rxjs_observable_fromPromise.fromPromise(value);
	      }
	      else {
	          return rxjs_observable_of.of(value);
	      }
	  }
	
	  /**
	   * @experimental
	   */
	  var /** @type {?} */ ROUTES = new _angular_core.OpaqueToken('ROUTES');
	  var LoadedRouterConfig = (function () {
	      /**
	       * @param {?} routes
	       * @param {?} injector
	       * @param {?} factoryResolver
	       * @param {?} injectorFactory
	       */
	      function LoadedRouterConfig(routes, injector, factoryResolver, injectorFactory) {
	          this.routes = routes;
	          this.injector = injector;
	          this.factoryResolver = factoryResolver;
	          this.injectorFactory = injectorFactory;
	      }
	      return LoadedRouterConfig;
	  }());
	  var RouterConfigLoader = (function () {
	      /**
	       * @param {?} loader
	       * @param {?} compiler
	       */
	      function RouterConfigLoader(loader, compiler) {
	          this.loader = loader;
	          this.compiler = compiler;
	      }
	      /**
	       * @param {?} parentInjector
	       * @param {?} loadChildren
	       * @return {?}
	       */
	      RouterConfigLoader.prototype.load = function (parentInjector, loadChildren) {
	          return rxjs_operator_map.map.call(this.loadModuleFactory(loadChildren), function (r) {
	              var /** @type {?} */ ref = r.create(parentInjector);
	              var /** @type {?} */ injectorFactory = function (parent) { return r.create(parent).injector; };
	              return new LoadedRouterConfig(flatten(ref.injector.get(ROUTES)), ref.injector, ref.componentFactoryResolver, injectorFactory);
	          });
	      };
	      /**
	       * @param {?} loadChildren
	       * @return {?}
	       */
	      RouterConfigLoader.prototype.loadModuleFactory = function (loadChildren) {
	          var _this = this;
	          if (typeof loadChildren === 'string') {
	              return rxjs_observable_fromPromise.fromPromise(this.loader.load(loadChildren));
	          }
	          else {
	              var /** @type {?} */ offlineMode_1 = this.compiler instanceof _angular_core.Compiler;
	              return rxjs_operator_mergeMap.mergeMap.call(wrapIntoObservable(loadChildren()), function (t) { return offlineMode_1 ? rxjs_observable_of.of(/** @type {?} */ (t)) : rxjs_observable_fromPromise.fromPromise(_this.compiler.compileModuleAsync(t)); });
	          }
	      };
	      return RouterConfigLoader;
	  }());
	
	  /**
	   * @return {?}
	   */
	  function createEmptyUrlTree() {
	      return new UrlTree(new UrlSegmentGroup([], {}), {}, null);
	  }
	  /**
	   * @param {?} container
	   * @param {?} containee
	   * @param {?} exact
	   * @return {?}
	   */
	  function containsTree(container, containee, exact) {
	      if (exact) {
	          return equalQueryParams(container.queryParams, containee.queryParams) &&
	              equalSegmentGroups(container.root, containee.root);
	      }
	      else {
	          return containsQueryParams(container.queryParams, containee.queryParams) &&
	              containsSegmentGroup(container.root, containee.root);
	      }
	  }
	  /**
	   * @param {?} container
	   * @param {?} containee
	   * @return {?}
	   */
	  function equalQueryParams(container, containee) {
	      return shallowEqual(container, containee);
	  }
	  /**
	   * @param {?} container
	   * @param {?} containee
	   * @return {?}
	   */
	  function equalSegmentGroups(container, containee) {
	      if (!equalPath(container.segments, containee.segments))
	          return false;
	      if (container.numberOfChildren !== containee.numberOfChildren)
	          return false;
	      for (var c in containee.children) {
	          if (!container.children[c])
	              return false;
	          if (!equalSegmentGroups(container.children[c], containee.children[c]))
	              return false;
	      }
	      return true;
	  }
	  /**
	   * @param {?} container
	   * @param {?} containee
	   * @return {?}
	   */
	  function containsQueryParams(container, containee) {
	      return Object.keys(containee) <= Object.keys(container) &&
	          Object.keys(containee).every(function (key) { return containee[key] === container[key]; });
	  }
	  /**
	   * @param {?} container
	   * @param {?} containee
	   * @return {?}
	   */
	  function containsSegmentGroup(container, containee) {
	      return containsSegmentGroupHelper(container, containee, containee.segments);
	  }
	  /**
	   * @param {?} container
	   * @param {?} containee
	   * @param {?} containeePaths
	   * @return {?}
	   */
	  function containsSegmentGroupHelper(container, containee, containeePaths) {
	      if (container.segments.length > containeePaths.length) {
	          var /** @type {?} */ current = container.segments.slice(0, containeePaths.length);
	          if (!equalPath(current, containeePaths))
	              return false;
	          if (containee.hasChildren())
	              return false;
	          return true;
	      }
	      else if (container.segments.length === containeePaths.length) {
	          if (!equalPath(container.segments, containeePaths))
	              return false;
	          for (var c in containee.children) {
	              if (!container.children[c])
	                  return false;
	              if (!containsSegmentGroup(container.children[c], containee.children[c]))
	                  return false;
	          }
	          return true;
	      }
	      else {
	          var /** @type {?} */ current = containeePaths.slice(0, container.segments.length);
	          var /** @type {?} */ next = containeePaths.slice(container.segments.length);
	          if (!equalPath(container.segments, current))
	              return false;
	          if (!container.children[PRIMARY_OUTLET])
	              return false;
	          return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next);
	      }
	  }
	  /**
	   *  *
	    * *
	    * ```
	    * class MyComponent {
	    * constructor(router: Router) {
	    * const tree: UrlTree =
	    * router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');
	    * const f = tree.fragment; // return 'fragment'
	    * const q = tree.queryParams; // returns {debug: 'true'}
	    * const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
	    * const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
	    * g.children[PRIMARY_OUTLET].segments; // returns 2 segments 'user' and 'victor'
	    * g.children['support'].segments; // return 1 segment 'help'
	    * }
	    * }
	    * ```
	    * *
	    * *
	    * Since a router state is a tree, and the URL is nothing but a serialized state, the URL is a
	    * serialized tree.
	    * UrlTree is a data structure that provides a lot of affordances in dealing with URLs
	    * *
	   */
	  var UrlTree = (function () {
	      /**
	       * @param {?} root
	       * @param {?} queryParams
	       * @param {?} fragment
	       */
	      function UrlTree(root, queryParams, fragment) {
	          this.root = root;
	          this.queryParams = queryParams;
	          this.fragment = fragment;
	      }
	      /**
	       * @return {?}
	       */
	      UrlTree.prototype.toString = function () { return new DefaultUrlSerializer().serialize(this); };
	      return UrlTree;
	  }());
	  /**
	   *  *
	    * See {@link UrlTree} for more information.
	    * *
	   */
	  var UrlSegmentGroup = (function () {
	      /**
	       * @param {?} segments
	       * @param {?} children
	       */
	      function UrlSegmentGroup(segments, children) {
	          var _this = this;
	          this.segments = segments;
	          this.children = children;
	          this.parent = null;
	          forEach(children, function (v, k) { return v.parent = _this; });
	      }
	      /**
	       *  Return true if the segment has child segments
	       * @return {?}
	       */
	      UrlSegmentGroup.prototype.hasChildren = function () { return this.numberOfChildren > 0; };
	      Object.defineProperty(UrlSegmentGroup.prototype, "numberOfChildren", {
	          /**
	           *  Returns the number of child sements.
	           * @return {?}
	           */
	          get: function () { return Object.keys(this.children).length; },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @return {?}
	       */
	      UrlSegmentGroup.prototype.toString = function () { return serializePaths(this); };
	      return UrlSegmentGroup;
	  }());
	  /**
	   *  *
	    * *
	    * ```
	    * class MyComponent {
	    * constructor(router: Router) {
	    * const tree: UrlTree = router.parseUrl('/team;id=33');
	    * const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
	    * const s: UrlSegment[] = g.segments;
	    * s[0].path; // returns 'team'
	    * s[0].parameters; // returns {id: 33}
	    * }
	    * }
	    * ```
	    * *
	    * *
	    * A UrlSegment is a part of a URL between the two slashes. It contains a path and
	    * the matrix parameters associated with the segment.
	    * *
	   */
	  var UrlSegment = (function () {
	      /**
	       * @param {?} path
	       * @param {?} parameters
	       */
	      function UrlSegment(path, parameters) {
	          this.path = path;
	          this.parameters = parameters;
	      }
	      /**
	       * @return {?}
	       */
	      UrlSegment.prototype.toString = function () { return serializePath(this); };
	      return UrlSegment;
	  }());
	  /**
	   * @param {?} a
	   * @param {?} b
	   * @return {?}
	   */
	  function equalSegments(a, b) {
	      if (a.length !== b.length)
	          return false;
	      for (var /** @type {?} */ i = 0; i < a.length; ++i) {
	          if (a[i].path !== b[i].path)
	              return false;
	          if (!shallowEqual(a[i].parameters, b[i].parameters))
	              return false;
	      }
	      return true;
	  }
	  /**
	   * @param {?} a
	   * @param {?} b
	   * @return {?}
	   */
	  function equalPath(a, b) {
	      if (a.length !== b.length)
	          return false;
	      for (var /** @type {?} */ i = 0; i < a.length; ++i) {
	          if (a[i].path !== b[i].path)
	              return false;
	      }
	      return true;
	  }
	  /**
	   * @param {?} segment
	   * @param {?} fn
	   * @return {?}
	   */
	  function mapChildrenIntoArray(segment, fn) {
	      var /** @type {?} */ res = [];
	      forEach(segment.children, function (child, childOutlet) {
	          if (childOutlet === PRIMARY_OUTLET) {
	              res = res.concat(fn(child, childOutlet));
	          }
	      });
	      forEach(segment.children, function (child, childOutlet) {
	          if (childOutlet !== PRIMARY_OUTLET) {
	              res = res.concat(fn(child, childOutlet));
	          }
	      });
	      return res;
	  }
	  /**
	   *  *
	    * make all URLs case insensitive by providing a custom UrlSerializer.
	    * *
	    * See {@link DefaultUrlSerializer} for an example of a URL serializer.
	    * *
	   * @abstract
	   */
	  var UrlSerializer = (function () {
	      function UrlSerializer() {
	      }
	      /**
	       *  Parse a url into a {@link UrlTree}.
	       * @abstract
	       * @param {?} url
	       * @return {?}
	       */
	      UrlSerializer.prototype.parse = function (url) { };
	      /**
	       *  Converts a {@link UrlTree} into a url.
	       * @abstract
	       * @param {?} tree
	       * @return {?}
	       */
	      UrlSerializer.prototype.serialize = function (tree) { };
	      return UrlSerializer;
	  }());
	  /**
	   *  *
	    * *
	    * Example URLs:
	    * *
	    * ```
	    * /inbox/33(popup:compose)
	    * /inbox/33;open=true/messages/44
	    * ```
	    * *
	    * DefaultUrlSerializer uses parentheses to serialize secondary segments (e.g., popup:compose), the
	    * colon syntax to specify the outlet, and the ';parameter=value' syntax (e.g., open=true) to
	    * specify route specific parameters.
	    * *
	   */
	  var DefaultUrlSerializer = (function () {
	      function DefaultUrlSerializer() {
	      }
	      /**
	       *  Parse a url into a {@link UrlTree}.
	       * @param {?} url
	       * @return {?}
	       */
	      DefaultUrlSerializer.prototype.parse = function (url) {
	          var /** @type {?} */ p = new UrlParser(url);
	          return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
	      };
	      /**
	       *  Converts a {@link UrlTree} into a url.
	       * @param {?} tree
	       * @return {?}
	       */
	      DefaultUrlSerializer.prototype.serialize = function (tree) {
	          var /** @type {?} */ segment = "/" + serializeSegment(tree.root, true);
	          var /** @type {?} */ query = serializeQueryParams(tree.queryParams);
	          var /** @type {?} */ fragment = tree.fragment !== null && tree.fragment !== undefined ? "#" + encodeURI(tree.fragment) : '';
	          return "" + segment + query + fragment;
	      };
	      return DefaultUrlSerializer;
	  }());
	  /**
	   * @param {?} segment
	   * @return {?}
	   */
	  function serializePaths(segment) {
	      return segment.segments.map(function (p) { return serializePath(p); }).join('/');
	  }
	  /**
	   * @param {?} segment
	   * @param {?} root
	   * @return {?}
	   */
	  function serializeSegment(segment, root) {
	      if (segment.hasChildren() && root) {
	          var /** @type {?} */ primary = segment.children[PRIMARY_OUTLET] ?
	              serializeSegment(segment.children[PRIMARY_OUTLET], false) :
	              '';
	          var /** @type {?} */ children_1 = [];
	          forEach(segment.children, function (v, k) {
	              if (k !== PRIMARY_OUTLET) {
	                  children_1.push(k + ":" + serializeSegment(v, false));
	              }
	          });
	          if (children_1.length > 0) {
	              return primary + "(" + children_1.join('//') + ")";
	          }
	          else {
	              return "" + primary;
	          }
	      }
	      else if (segment.hasChildren() && !root) {
	          var /** @type {?} */ children = mapChildrenIntoArray(segment, function (v, k) {
	              if (k === PRIMARY_OUTLET) {
	                  return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
	              }
	              else {
	                  return [(k + ":" + serializeSegment(v, false))];
	              }
	          });
	          return serializePaths(segment) + "/(" + children.join('//') + ")";
	      }
	      else {
	          return serializePaths(segment);
	      }
	  }
	  /**
	   * @param {?} s
	   * @return {?}
	   */
	  function encode(s) {
	      return encodeURIComponent(s);
	  }
	  /**
	   * @param {?} s
	   * @return {?}
	   */
	  function decode(s) {
	      return decodeURIComponent(s);
	  }
	  /**
	   * @param {?} path
	   * @return {?}
	   */
	  function serializePath(path) {
	      return "" + encode(path.path) + serializeParams(path.parameters);
	  }
	  /**
	   * @param {?} params
	   * @return {?}
	   */
	  function serializeParams(params) {
	      return pairs(params).map(function (p) { return (";" + encode(p.first) + "=" + encode(p.second)); }).join('');
	  }
	  /**
	   * @param {?} params
	   * @return {?}
	   */
	  function serializeQueryParams(params) {
	      var /** @type {?} */ strs = pairs(params).map(function (p) { return (encode(p.first) + "=" + encode(p.second)); });
	      return strs.length > 0 ? "?" + strs.join("&") : '';
	  }
	  var Pair = (function () {
	      /**
	       * @param {?} first
	       * @param {?} second
	       */
	      function Pair(first, second) {
	          this.first = first;
	          this.second = second;
	      }
	      return Pair;
	  }());
	  /**
	   * @param {?} obj
	   * @return {?}
	   */
	  function pairs(obj) {
	      var /** @type {?} */ res = [];
	      for (var prop in obj) {
	          if (obj.hasOwnProperty(prop)) {
	              res.push(new Pair(prop, obj[prop]));
	          }
	      }
	      return res;
	  }
	  var /** @type {?} */ SEGMENT_RE = /^[^\/\(\)\?;=&#]+/;
	  /**
	   * @param {?} str
	   * @return {?}
	   */
	  function matchSegments(str) {
	      SEGMENT_RE.lastIndex = 0;
	      var /** @type {?} */ match = str.match(SEGMENT_RE);
	      return match ? match[0] : '';
	  }
	  var /** @type {?} */ QUERY_PARAM_RE = /^[^=\?&#]+/;
	  /**
	   * @param {?} str
	   * @return {?}
	   */
	  function matchQueryParams(str) {
	      QUERY_PARAM_RE.lastIndex = 0;
	      var /** @type {?} */ match = str.match(SEGMENT_RE);
	      return match ? match[0] : '';
	  }
	  var /** @type {?} */ QUERY_PARAM_VALUE_RE = /^[^\?&#]+/;
	  /**
	   * @param {?} str
	   * @return {?}
	   */
	  function matchUrlQueryParamValue(str) {
	      QUERY_PARAM_VALUE_RE.lastIndex = 0;
	      var /** @type {?} */ match = str.match(QUERY_PARAM_VALUE_RE);
	      return match ? match[0] : '';
	  }
	  var UrlParser = (function () {
	      /**
	       * @param {?} url
	       */
	      function UrlParser(url) {
	          this.url = url;
	          this.remaining = url;
	      }
	      /**
	       * @param {?} str
	       * @return {?}
	       */
	      UrlParser.prototype.peekStartsWith = function (str) { return this.remaining.startsWith(str); };
	      /**
	       * @param {?} str
	       * @return {?}
	       */
	      UrlParser.prototype.capture = function (str) {
	          if (!this.remaining.startsWith(str)) {
	              throw new Error("Expected \"" + str + "\".");
	          }
	          this.remaining = this.remaining.substring(str.length);
	      };
	      /**
	       * @return {?}
	       */
	      UrlParser.prototype.parseRootSegment = function () {
	          if (this.remaining.startsWith('/')) {
	              this.capture('/');
	          }
	          if (this.remaining === '' || this.remaining.startsWith('?') || this.remaining.startsWith('#')) {
	              return new UrlSegmentGroup([], {});
	          }
	          else {
	              return new UrlSegmentGroup([], this.parseChildren());
	          }
	      };
	      /**
	       * @return {?}
	       */
	      UrlParser.prototype.parseChildren = function () {
	          if (this.remaining.length == 0) {
	              return {};
	          }
	          if (this.peekStartsWith('/')) {
	              this.capture('/');
	          }
	          var /** @type {?} */ paths = [];
	          if (!this.peekStartsWith('(')) {
	              paths.push(this.parseSegments());
	          }
	          while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
	              this.capture('/');
	              paths.push(this.parseSegments());
	          }
	          var /** @type {?} */ children = {};
	          if (this.peekStartsWith('/(')) {
	              this.capture('/');
	              children = this.parseParens(true);
	          }
	          var /** @type {?} */ res = {};
	          if (this.peekStartsWith('(')) {
	              res = this.parseParens(false);
	          }
	          if (paths.length > 0 || Object.keys(children).length > 0) {
	              res[PRIMARY_OUTLET] = new UrlSegmentGroup(paths, children);
	          }
	          return res;
	      };
	      /**
	       * @return {?}
	       */
	      UrlParser.prototype.parseSegments = function () {
	          var /** @type {?} */ path = matchSegments(this.remaining);
	          if (path === '' && this.peekStartsWith(';')) {
	              throw new Error("Empty path url segment cannot have parameters: '" + this.remaining + "'.");
	          }
	          this.capture(path);
	          var /** @type {?} */ matrixParams = {};
	          if (this.peekStartsWith(';')) {
	              matrixParams = this.parseMatrixParams();
	          }
	          return new UrlSegment(decode(path), matrixParams);
	      };
	      /**
	       * @return {?}
	       */
	      UrlParser.prototype.parseQueryParams = function () {
	          var /** @type {?} */ params = {};
	          if (this.peekStartsWith('?')) {
	              this.capture('?');
	              this.parseQueryParam(params);
	              while (this.remaining.length > 0 && this.peekStartsWith('&')) {
	                  this.capture('&');
	                  this.parseQueryParam(params);
	              }
	          }
	          return params;
	      };
	      /**
	       * @return {?}
	       */
	      UrlParser.prototype.parseFragment = function () {
	          if (this.peekStartsWith('#')) {
	              return decodeURI(this.remaining.substring(1));
	          }
	          else {
	              return null;
	          }
	      };
	      /**
	       * @return {?}
	       */
	      UrlParser.prototype.parseMatrixParams = function () {
	          var /** @type {?} */ params = {};
	          while (this.remaining.length > 0 && this.peekStartsWith(';')) {
	              this.capture(';');
	              this.parseParam(params);
	          }
	          return params;
	      };
	      /**
	       * @param {?} params
	       * @return {?}
	       */
	      UrlParser.prototype.parseParam = function (params) {
	          var /** @type {?} */ key = matchSegments(this.remaining);
	          if (!key) {
	              return;
	          }
	          this.capture(key);
	          var /** @type {?} */ value = '';
	          if (this.peekStartsWith('=')) {
	              this.capture('=');
	              var /** @type {?} */ valueMatch = matchSegments(this.remaining);
	              if (valueMatch) {
	                  value = valueMatch;
	                  this.capture(value);
	              }
	          }
	          params[decode(key)] = decode(value);
	      };
	      /**
	       * @param {?} params
	       * @return {?}
	       */
	      UrlParser.prototype.parseQueryParam = function (params) {
	          var /** @type {?} */ key = matchQueryParams(this.remaining);
	          if (!key) {
	              return;
	          }
	          this.capture(key);
	          var /** @type {?} */ value = '';
	          if (this.peekStartsWith('=')) {
	              this.capture('=');
	              var /** @type {?} */ valueMatch = matchUrlQueryParamValue(this.remaining);
	              if (valueMatch) {
	                  value = valueMatch;
	                  this.capture(value);
	              }
	          }
	          params[decode(key)] = decode(value);
	      };
	      /**
	       * @param {?} allowPrimary
	       * @return {?}
	       */
	      UrlParser.prototype.parseParens = function (allowPrimary) {
	          var /** @type {?} */ segments = {};
	          this.capture('(');
	          while (!this.peekStartsWith(')') && this.remaining.length > 0) {
	              var /** @type {?} */ path = matchSegments(this.remaining);
	              var /** @type {?} */ next = this.remaining[path.length];
	              // if is is not one of these characters, then the segment was unescaped
	              // or the group was not closed
	              if (next !== '/' && next !== ')' && next !== ';') {
	                  throw new Error("Cannot parse url '" + this.url + "'");
	              }
	              var /** @type {?} */ outletName = void 0;
	              if (path.indexOf(':') > -1) {
	                  outletName = path.substr(0, path.indexOf(':'));
	                  this.capture(outletName);
	                  this.capture(':');
	              }
	              else if (allowPrimary) {
	                  outletName = PRIMARY_OUTLET;
	              }
	              var /** @type {?} */ children = this.parseChildren();
	              segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] :
	                  new UrlSegmentGroup([], children);
	              if (this.peekStartsWith('//')) {
	                  this.capture('//');
	              }
	          }
	          this.capture(')');
	          return segments;
	      };
	      return UrlParser;
	  }());
	
	  var NoMatch = (function () {
	      /**
	       * @param {?=} segmentGroup
	       */
	      function NoMatch(segmentGroup) {
	          if (segmentGroup === void 0) { segmentGroup = null; }
	          this.segmentGroup = segmentGroup;
	      }
	      return NoMatch;
	  }());
	  var AbsoluteRedirect = (function () {
	      /**
	       * @param {?} urlTree
	       */
	      function AbsoluteRedirect(urlTree) {
	          this.urlTree = urlTree;
	      }
	      return AbsoluteRedirect;
	  }());
	  /**
	   * @param {?} segmentGroup
	   * @return {?}
	   */
	  function noMatch(segmentGroup) {
	      return new rxjs_Observable.Observable(function (obs) { return obs.error(new NoMatch(segmentGroup)); });
	  }
	  /**
	   * @param {?} newTree
	   * @return {?}
	   */
	  function absoluteRedirect(newTree) {
	      return new rxjs_Observable.Observable(function (obs) { return obs.error(new AbsoluteRedirect(newTree)); });
	  }
	  /**
	   * @param {?} redirectTo
	   * @return {?}
	   */
	  function namedOutletsRedirect(redirectTo) {
	      return new rxjs_Observable.Observable(function (obs) { return obs.error(new Error("Only absolute redirects can have named outlets. redirectTo: '" + redirectTo + "'")); });
	  }
	  /**
	   * @param {?} route
	   * @return {?}
	   */
	  function canLoadFails(route) {
	      return new rxjs_Observable.Observable(function (obs) { return obs.error(new NavigationCancelingError("Cannot load children because the guard of the route \"path: '" + route.path + "'\" returned false")); });
	  }
	  /**
	   * @param {?} injector
	   * @param {?} configLoader
	   * @param {?} urlSerializer
	   * @param {?} urlTree
	   * @param {?} config
	   * @return {?}
	   */
	  function applyRedirects(injector, configLoader, urlSerializer, urlTree, config) {
	      return new ApplyRedirects(injector, configLoader, urlSerializer, urlTree, config).apply();
	  }
	  var ApplyRedirects = (function () {
	      /**
	       * @param {?} injector
	       * @param {?} configLoader
	       * @param {?} urlSerializer
	       * @param {?} urlTree
	       * @param {?} config
	       */
	      function ApplyRedirects(injector, configLoader, urlSerializer, urlTree, config) {
	          this.injector = injector;
	          this.configLoader = configLoader;
	          this.urlSerializer = urlSerializer;
	          this.urlTree = urlTree;
	          this.config = config;
	          this.allowRedirects = true;
	      }
	      /**
	       * @return {?}
	       */
	      ApplyRedirects.prototype.apply = function () {
	          var _this = this;
	          var /** @type {?} */ expanded$ = this.expandSegmentGroup(this.injector, this.config, this.urlTree.root, PRIMARY_OUTLET);
	          var /** @type {?} */ urlTrees$ = rxjs_operator_map.map.call(expanded$, function (rootSegmentGroup) { return _this.createUrlTree(rootSegmentGroup, _this.urlTree.queryParams, _this.urlTree.fragment); });
	          return rxjs_operator_catch._catch.call(urlTrees$, function (e) {
	              if (e instanceof AbsoluteRedirect) {
	                  // after an absolute redirect we do not apply any more redirects!
	                  _this.allowRedirects = false;
	                  // we need to run matching, so we can fetch all lazy-loaded modules
	                  return _this.match(e.urlTree);
	              }
	              else if (e instanceof NoMatch) {
	                  throw _this.noMatchError(e);
	              }
	              else {
	                  throw e;
	              }
	          });
	      };
	      /**
	       * @param {?} tree
	       * @return {?}
	       */
	      ApplyRedirects.prototype.match = function (tree) {
	          var _this = this;
	          var /** @type {?} */ expanded$ = this.expandSegmentGroup(this.injector, this.config, tree.root, PRIMARY_OUTLET);
	          var /** @type {?} */ mapped$ = rxjs_operator_map.map.call(expanded$, function (rootSegmentGroup) {
	              return _this.createUrlTree(rootSegmentGroup, tree.queryParams, tree.fragment);
	          });
	          return rxjs_operator_catch._catch.call(mapped$, function (e) {
	              if (e instanceof NoMatch) {
	                  throw _this.noMatchError(e);
	              }
	              else {
	                  throw e;
	              }
	          });
	      };
	      /**
	       * @param {?} e
	       * @return {?}
	       */
	      ApplyRedirects.prototype.noMatchError = function (e) {
	          return new Error("Cannot match any routes. URL Segment: '" + e.segmentGroup + "'");
	      };
	      /**
	       * @param {?} rootCandidate
	       * @param {?} queryParams
	       * @param {?} fragment
	       * @return {?}
	       */
	      ApplyRedirects.prototype.createUrlTree = function (rootCandidate, queryParams, fragment) {
	          var /** @type {?} */ root = rootCandidate.segments.length > 0 ?
	              new UrlSegmentGroup([], (_a = {}, _a[PRIMARY_OUTLET] = rootCandidate, _a)) :
	              rootCandidate;
	          return new UrlTree(root, queryParams, fragment);
	          var _a;
	      };
	      /**
	       * @param {?} injector
	       * @param {?} routes
	       * @param {?} segmentGroup
	       * @param {?} outlet
	       * @return {?}
	       */
	      ApplyRedirects.prototype.expandSegmentGroup = function (injector, routes, segmentGroup, outlet) {
	          if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
	              return rxjs_operator_map.map.call(this.expandChildren(injector, routes, segmentGroup), function (children) { return new UrlSegmentGroup([], children); });
	          }
	          else {
	              return this.expandSegment(injector, segmentGroup, routes, segmentGroup.segments, outlet, true);
	          }
	      };
	      /**
	       * @param {?} injector
	       * @param {?} routes
	       * @param {?} segmentGroup
	       * @return {?}
	       */
	      ApplyRedirects.prototype.expandChildren = function (injector, routes, segmentGroup) {
	          var _this = this;
	          return waitForMap(segmentGroup.children, function (childOutlet, child) { return _this.expandSegmentGroup(injector, routes, child, childOutlet); });
	      };
	      /**
	       * @param {?} injector
	       * @param {?} segmentGroup
	       * @param {?} routes
	       * @param {?} segments
	       * @param {?} outlet
	       * @param {?} allowRedirects
	       * @return {?}
	       */
	      ApplyRedirects.prototype.expandSegment = function (injector, segmentGroup, routes, segments, outlet, allowRedirects) {
	          var _this = this;
	          var /** @type {?} */ routes$ = rxjs_observable_of.of.apply(void 0, routes);
	          var /** @type {?} */ processedRoutes$ = rxjs_operator_map.map.call(routes$, function (r) {
	              var /** @type {?} */ expanded$ = _this.expandSegmentAgainstRoute(injector, segmentGroup, routes, r, segments, outlet, allowRedirects);
	              return rxjs_operator_catch._catch.call(expanded$, function (e) {
	                  if (e instanceof NoMatch)
	                      return rxjs_observable_of.of(null);
	                  else
	                      throw e;
	              });
	          });
	          var /** @type {?} */ concattedProcessedRoutes$ = rxjs_operator_concatAll.concatAll.call(processedRoutes$);
	          var /** @type {?} */ first$ = rxjs_operator_first.first.call(concattedProcessedRoutes$, function (s) { return !!s; });
	          return rxjs_operator_catch._catch.call(first$, function (e, _) {
	              if (e instanceof rxjs_util_EmptyError.EmptyError) {
	                  if (_this.noLeftoversInUrl(segmentGroup, segments, outlet)) {
	                      return rxjs_observable_of.of(new UrlSegmentGroup([], {}));
	                  }
	                  else {
	                      throw new NoMatch(segmentGroup);
	                  }
	              }
	              else {
	                  throw e;
	              }
	          });
	      };
	      /**
	       * @param {?} segmentGroup
	       * @param {?} segments
	       * @param {?} outlet
	       * @return {?}
	       */
	      ApplyRedirects.prototype.noLeftoversInUrl = function (segmentGroup, segments, outlet) {
	          return segments.length === 0 && !segmentGroup.children[outlet];
	      };
	      /**
	       * @param {?} injector
	       * @param {?} segmentGroup
	       * @param {?} routes
	       * @param {?} route
	       * @param {?} paths
	       * @param {?} outlet
	       * @param {?} allowRedirects
	       * @return {?}
	       */
	      ApplyRedirects.prototype.expandSegmentAgainstRoute = function (injector, segmentGroup, routes, route, paths, outlet, allowRedirects) {
	          if (getOutlet$1(route) !== outlet)
	              return noMatch(segmentGroup);
	          if (route.redirectTo !== undefined && !(allowRedirects && this.allowRedirects))
	              return noMatch(segmentGroup);
	          if (route.redirectTo === undefined) {
	              return this.matchSegmentAgainstRoute(injector, segmentGroup, route, paths);
	          }
	          else {
	              return this.expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, paths, outlet);
	          }
	      };
	      /**
	       * @param {?} injector
	       * @param {?} segmentGroup
	       * @param {?} routes
	       * @param {?} route
	       * @param {?} segments
	       * @param {?} outlet
	       * @return {?}
	       */
	      ApplyRedirects.prototype.expandSegmentAgainstRouteUsingRedirect = function (injector, segmentGroup, routes, route, segments, outlet) {
	          if (route.path === '**') {
	              return this.expandWildCardWithParamsAgainstRouteUsingRedirect(injector, routes, route, outlet);
	          }
	          else {
	              return this.expandRegularSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet);
	          }
	      };
	      /**
	       * @param {?} injector
	       * @param {?} routes
	       * @param {?} route
	       * @param {?} outlet
	       * @return {?}
	       */
	      ApplyRedirects.prototype.expandWildCardWithParamsAgainstRouteUsingRedirect = function (injector, routes, route, outlet) {
	          var _this = this;
	          var /** @type {?} */ newTree = this.applyRedirectCommands([], route.redirectTo, {});
	          if (route.redirectTo.startsWith('/')) {
	              return absoluteRedirect(newTree);
	          }
	          else {
	              return rxjs_operator_mergeMap.mergeMap.call(this.lineralizeSegments(route, newTree), function (newSegments) {
	                  var /** @type {?} */ group = new UrlSegmentGroup(newSegments, {});
	                  return _this.expandSegment(injector, group, routes, newSegments, outlet, false);
	              });
	          }
	      };
	      /**
	       * @param {?} injector
	       * @param {?} segmentGroup
	       * @param {?} routes
	       * @param {?} route
	       * @param {?} segments
	       * @param {?} outlet
	       * @return {?}
	       */
	      ApplyRedirects.prototype.expandRegularSegmentAgainstRouteUsingRedirect = function (injector, segmentGroup, routes, route, segments, outlet) {
	          var _this = this;
	          var _a = match(segmentGroup, route, segments), matched = _a.matched, consumedSegments = _a.consumedSegments, lastChild = _a.lastChild, positionalParamSegments = _a.positionalParamSegments;
	          if (!matched)
	              return noMatch(segmentGroup);
	          var /** @type {?} */ newTree = this.applyRedirectCommands(consumedSegments, route.redirectTo, /** @type {?} */ (positionalParamSegments));
	          if (route.redirectTo.startsWith('/')) {
	              return absoluteRedirect(newTree);
	          }
	          else {
	              return rxjs_operator_mergeMap.mergeMap.call(this.lineralizeSegments(route, newTree), function (newSegments) {
	                  return _this.expandSegment(injector, segmentGroup, routes, newSegments.concat(segments.slice(lastChild)), outlet, false);
	              });
	          }
	      };
	      /**
	       * @param {?} injector
	       * @param {?} rawSegmentGroup
	       * @param {?} route
	       * @param {?} segments
	       * @return {?}
	       */
	      ApplyRedirects.prototype.matchSegmentAgainstRoute = function (injector, rawSegmentGroup, route, segments) {
	          var _this = this;
	          if (route.path === '**') {
	              if (route.loadChildren) {
	                  return rxjs_operator_map.map.call(this.configLoader.load(injector, route.loadChildren), function (r) {
	                      ((route))._loadedConfig = r;
	                      return rxjs_observable_of.of(new UrlSegmentGroup(segments, {}));
	                  });
	              }
	              else {
	                  return rxjs_observable_of.of(new UrlSegmentGroup(segments, {}));
	              }
	          }
	          else {
	              var _a = match(rawSegmentGroup, route, segments), matched = _a.matched, consumedSegments_1 = _a.consumedSegments, lastChild = _a.lastChild;
	              if (!matched)
	                  return noMatch(rawSegmentGroup);
	              var /** @type {?} */ rawSlicedSegments_1 = segments.slice(lastChild);
	              var /** @type {?} */ childConfig$ = this.getChildConfig(injector, route);
	              return rxjs_operator_mergeMap.mergeMap.call(childConfig$, function (routerConfig) {
	                  var /** @type {?} */ childInjector = routerConfig.injector;
	                  var /** @type {?} */ childConfig = routerConfig.routes;
	                  var _a = split(rawSegmentGroup, consumedSegments_1, rawSlicedSegments_1, childConfig), segmentGroup = _a.segmentGroup, slicedSegments = _a.slicedSegments;
	                  if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
	                      var /** @type {?} */ expanded$ = _this.expandChildren(childInjector, childConfig, segmentGroup);
	                      return rxjs_operator_map.map.call(expanded$, function (children) { return new UrlSegmentGroup(consumedSegments_1, children); });
	                  }
	                  else if (childConfig.length === 0 && slicedSegments.length === 0) {
	                      return rxjs_observable_of.of(new UrlSegmentGroup(consumedSegments_1, {}));
	                  }
	                  else {
	                      var /** @type {?} */ expanded$ = _this.expandSegment(childInjector, segmentGroup, childConfig, slicedSegments, PRIMARY_OUTLET, true);
	                      return rxjs_operator_map.map.call(expanded$, function (cs) { return new UrlSegmentGroup(consumedSegments_1.concat(cs.segments), cs.children); });
	                  }
	              });
	          }
	      };
	      /**
	       * @param {?} injector
	       * @param {?} route
	       * @return {?}
	       */
	      ApplyRedirects.prototype.getChildConfig = function (injector, route) {
	          var _this = this;
	          if (route.children) {
	              return rxjs_observable_of.of(new LoadedRouterConfig(route.children, injector, null, null));
	          }
	          else if (route.loadChildren) {
	              return rxjs_operator_mergeMap.mergeMap.call(runGuards(injector, route), function (shouldLoad) {
	                  if (shouldLoad) {
	                      if (((route))._loadedConfig) {
	                          return rxjs_observable_of.of(((route))._loadedConfig);
	                      }
	                      else {
	                          return rxjs_operator_map.map.call(_this.configLoader.load(injector, route.loadChildren), function (r) {
	                              ((route))._loadedConfig = r;
	                              return r;
	                          });
	                      }
	                  }
	                  else {
	                      return canLoadFails(route);
	                  }
	              });
	          }
	          else {
	              return rxjs_observable_of.of(new LoadedRouterConfig([], injector, null, null));
	          }
	      };
	      /**
	       * @param {?} route
	       * @param {?} urlTree
	       * @return {?}
	       */
	      ApplyRedirects.prototype.lineralizeSegments = function (route, urlTree) {
	          var /** @type {?} */ res = [];
	          var /** @type {?} */ c = urlTree.root;
	          while (true) {
	              res = res.concat(c.segments);
	              if (c.numberOfChildren === 0) {
	                  return rxjs_observable_of.of(res);
	              }
	              else if (c.numberOfChildren > 1 || !c.children[PRIMARY_OUTLET]) {
	                  return namedOutletsRedirect(route.redirectTo);
	              }
	              else {
	                  c = c.children[PRIMARY_OUTLET];
	              }
	          }
	      };
	      /**
	       * @param {?} segments
	       * @param {?} redirectTo
	       * @param {?} posParams
	       * @return {?}
	       */
	      ApplyRedirects.prototype.applyRedirectCommands = function (segments, redirectTo, posParams) {
	          var /** @type {?} */ t = this.urlSerializer.parse(redirectTo);
	          return this.applyRedirectCreatreUrlTree(redirectTo, this.urlSerializer.parse(redirectTo), segments, posParams);
	      };
	      /**
	       * @param {?} redirectTo
	       * @param {?} urlTree
	       * @param {?} segments
	       * @param {?} posParams
	       * @return {?}
	       */
	      ApplyRedirects.prototype.applyRedirectCreatreUrlTree = function (redirectTo, urlTree, segments, posParams) {
	          var /** @type {?} */ newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
	          return new UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
	      };
	      /**
	       * @param {?} redirectToParams
	       * @param {?} actualParams
	       * @return {?}
	       */
	      ApplyRedirects.prototype.createQueryParams = function (redirectToParams, actualParams) {
	          var /** @type {?} */ res = {};
	          forEach(redirectToParams, function (v, k) {
	              if (v.startsWith(':')) {
	                  res[k] = actualParams[v.substring(1)];
	              }
	              else {
	                  res[k] = v;
	              }
	          });
	          return res;
	      };
	      /**
	       * @param {?} redirectTo
	       * @param {?} group
	       * @param {?} segments
	       * @param {?} posParams
	       * @return {?}
	       */
	      ApplyRedirects.prototype.createSegmentGroup = function (redirectTo, group, segments, posParams) {
	          var _this = this;
	          var /** @type {?} */ updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
	          var /** @type {?} */ children = {};
	          forEach(group.children, function (child, name) {
	              children[name] = _this.createSegmentGroup(redirectTo, child, segments, posParams);
	          });
	          return new UrlSegmentGroup(updatedSegments, children);
	      };
	      /**
	       * @param {?} redirectTo
	       * @param {?} redirectToSegments
	       * @param {?} actualSegments
	       * @param {?} posParams
	       * @return {?}
	       */
	      ApplyRedirects.prototype.createSegments = function (redirectTo, redirectToSegments, actualSegments, posParams) {
	          var _this = this;
	          return redirectToSegments.map(function (s) { return s.path.startsWith(':') ? _this.findPosParam(redirectTo, s, posParams) :
	              _this.findOrReturn(s, actualSegments); });
	      };
	      /**
	       * @param {?} redirectTo
	       * @param {?} redirectToUrlSegment
	       * @param {?} posParams
	       * @return {?}
	       */
	      ApplyRedirects.prototype.findPosParam = function (redirectTo, redirectToUrlSegment, posParams) {
	          var /** @type {?} */ pos = posParams[redirectToUrlSegment.path.substring(1)];
	          if (!pos)
	              throw new Error("Cannot redirect to '" + redirectTo + "'. Cannot find '" + redirectToUrlSegment.path + "'.");
	          return pos;
	      };
	      /**
	       * @param {?} redirectToUrlSegment
	       * @param {?} actualSegments
	       * @return {?}
	       */
	      ApplyRedirects.prototype.findOrReturn = function (redirectToUrlSegment, actualSegments) {
	          var /** @type {?} */ idx = 0;
	          for (var _i = 0, actualSegments_1 = actualSegments; _i < actualSegments_1.length; _i++) {
	              var s = actualSegments_1[_i];
	              if (s.path === redirectToUrlSegment.path) {
	                  actualSegments.splice(idx);
	                  return s;
	              }
	              idx++;
	          }
	          return redirectToUrlSegment;
	      };
	      return ApplyRedirects;
	  }());
	  /**
	   * @param {?} injector
	   * @param {?} route
	   * @return {?}
	   */
	  function runGuards(injector, route) {
	      var /** @type {?} */ canLoad = route.canLoad;
	      if (!canLoad || canLoad.length === 0)
	          return rxjs_observable_of.of(true);
	      var /** @type {?} */ obs = rxjs_operator_map.map.call(rxjs_observable_from.from(canLoad), function (c) {
	          var /** @type {?} */ guard = injector.get(c);
	          if (guard.canLoad) {
	              return wrapIntoObservable(guard.canLoad(route));
	          }
	          else {
	              return wrapIntoObservable(guard(route));
	          }
	      });
	      return andObservables(obs);
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} route
	   * @param {?} segments
	   * @return {?}
	   */
	  function match(segmentGroup, route, segments) {
	      var /** @type {?} */ noMatch = { matched: false, consumedSegments: /** @type {?} */ ([]), lastChild: 0, positionalParamSegments: {} };
	      if (route.path === '') {
	          if ((route.pathMatch === 'full') && (segmentGroup.hasChildren() || segments.length > 0)) {
	              return { matched: false, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
	          }
	          else {
	              return { matched: true, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
	          }
	      }
	      var /** @type {?} */ matcher = route.matcher || defaultUrlMatcher;
	      var /** @type {?} */ res = matcher(segments, segmentGroup, route);
	      if (!res)
	          return noMatch;
	      return {
	          matched: true,
	          consumedSegments: res.consumed,
	          lastChild: res.consumed.length,
	          positionalParamSegments: res.posParams
	      };
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} consumedSegments
	   * @param {?} slicedSegments
	   * @param {?} config
	   * @return {?}
	   */
	  function split(segmentGroup, consumedSegments, slicedSegments, config) {
	      if (slicedSegments.length > 0 &&
	          containsEmptyPathRedirectsWithNamedOutlets(segmentGroup, slicedSegments, config)) {
	          var /** @type {?} */ s = new UrlSegmentGroup(consumedSegments, createChildrenForEmptySegments(config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
	          return { segmentGroup: mergeTrivialChildren(s), slicedSegments: [] };
	      }
	      else if (slicedSegments.length === 0 &&
	          containsEmptyPathRedirects(segmentGroup, slicedSegments, config)) {
	          var /** @type {?} */ s = new UrlSegmentGroup(segmentGroup.segments, addEmptySegmentsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
	          return { segmentGroup: mergeTrivialChildren(s), slicedSegments: slicedSegments };
	      }
	      else {
	          return { segmentGroup: segmentGroup, slicedSegments: slicedSegments };
	      }
	  }
	  /**
	   * @param {?} s
	   * @return {?}
	   */
	  function mergeTrivialChildren(s) {
	      if (s.numberOfChildren === 1 && s.children[PRIMARY_OUTLET]) {
	          var /** @type {?} */ c = s.children[PRIMARY_OUTLET];
	          return new UrlSegmentGroup(s.segments.concat(c.segments), c.children);
	      }
	      else {
	          return s;
	      }
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} slicedSegments
	   * @param {?} routes
	   * @param {?} children
	   * @return {?}
	   */
	  function addEmptySegmentsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
	      var /** @type {?} */ res = {};
	      for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
	          var r = routes_1[_i];
	          if (emptyPathRedirect(segmentGroup, slicedSegments, r) && !children[getOutlet$1(r)]) {
	              res[getOutlet$1(r)] = new UrlSegmentGroup([], {});
	          }
	      }
	      return merge(children, res);
	  }
	  /**
	   * @param {?} routes
	   * @param {?} primarySegmentGroup
	   * @return {?}
	   */
	  function createChildrenForEmptySegments(routes, primarySegmentGroup) {
	      var /** @type {?} */ res = {};
	      res[PRIMARY_OUTLET] = primarySegmentGroup;
	      for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
	          var r = routes_2[_i];
	          if (r.path === '' && getOutlet$1(r) !== PRIMARY_OUTLET) {
	              res[getOutlet$1(r)] = new UrlSegmentGroup([], {});
	          }
	      }
	      return res;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} slicedSegments
	   * @param {?} routes
	   * @return {?}
	   */
	  function containsEmptyPathRedirectsWithNamedOutlets(segmentGroup, slicedSegments, routes) {
	      return routes
	          .filter(function (r) { return emptyPathRedirect(segmentGroup, slicedSegments, r) &&
	          getOutlet$1(r) !== PRIMARY_OUTLET; })
	          .length > 0;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} slicedSegments
	   * @param {?} routes
	   * @return {?}
	   */
	  function containsEmptyPathRedirects(segmentGroup, slicedSegments, routes) {
	      return routes.filter(function (r) { return emptyPathRedirect(segmentGroup, slicedSegments, r); }).length > 0;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} slicedSegments
	   * @param {?} r
	   * @return {?}
	   */
	  function emptyPathRedirect(segmentGroup, slicedSegments, r) {
	      if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full')
	          return false;
	      return r.path === '' && r.redirectTo !== undefined;
	  }
	  /**
	   * @param {?} route
	   * @return {?}
	   */
	  function getOutlet$1(route) {
	      return route.outlet ? route.outlet : PRIMARY_OUTLET;
	  }
	
	  /**
	   * @param {?} config
	   * @param {?=} parentPath
	   * @return {?}
	   */
	  function validateConfig(config, parentPath) {
	      if (parentPath === void 0) { parentPath = ''; }
	      // forEach doesn't iterate undefined values
	      for (var /** @type {?} */ i = 0; i < config.length; i++) {
	          var /** @type {?} */ route = config[i];
	          var /** @type {?} */ fullPath = getFullPath(parentPath, route);
	          validateNode(route, fullPath);
	      }
	  }
	  /**
	   * @param {?} route
	   * @param {?} fullPath
	   * @return {?}
	   */
	  function validateNode(route, fullPath) {
	      if (!route) {
	          throw new Error("\n      Invalid configuration of route '" + fullPath + "': Encountered undefined route.\n      The reason might be an extra comma.\n       \n      Example: \n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    ");
	      }
	      if (Array.isArray(route)) {
	          throw new Error("Invalid configuration of route '" + fullPath + "': Array cannot be specified");
	      }
	      if (!route.component && (route.outlet && route.outlet !== PRIMARY_OUTLET)) {
	          throw new Error("Invalid configuration of route '" + fullPath + "': a componentless route cannot have a named outlet set");
	      }
	      if (route.redirectTo && route.children) {
	          throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and children cannot be used together");
	      }
	      if (route.redirectTo && route.loadChildren) {
	          throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and loadChildren cannot be used together");
	      }
	      if (route.children && route.loadChildren) {
	          throw new Error("Invalid configuration of route '" + fullPath + "': children and loadChildren cannot be used together");
	      }
	      if (route.redirectTo && route.component) {
	          throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and component cannot be used together");
	      }
	      if (route.path && route.matcher) {
	          throw new Error("Invalid configuration of route '" + fullPath + "': path and matcher cannot be used together");
	      }
	      if (route.redirectTo === void 0 && !route.component && !route.children && !route.loadChildren) {
	          throw new Error("Invalid configuration of route '" + fullPath + "'. One of the following must be provided: component, redirectTo, children or loadChildren");
	      }
	      if (route.path === void 0 && route.matcher === void 0) {
	          throw new Error("Invalid configuration of route '" + fullPath + "': routes must have either a path or a matcher specified");
	      }
	      if (typeof route.path === 'string' && route.path.charAt(0) === '/') {
	          throw new Error("Invalid configuration of route '" + fullPath + "': path cannot start with a slash");
	      }
	      if (route.path === '' && route.redirectTo !== void 0 && route.pathMatch === void 0) {
	          var /** @type {?} */ exp = "The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.";
	          throw new Error("Invalid configuration of route '{path: \"" + fullPath + "\", redirectTo: \"" + route.redirectTo + "\"}': please provide 'pathMatch'. " + exp);
	      }
	      if (route.pathMatch !== void 0 && route.pathMatch !== 'full' && route.pathMatch !== 'prefix') {
	          throw new Error("Invalid configuration of route '" + fullPath + "': pathMatch can only be set to 'prefix' or 'full'");
	      }
	      if (route.children) {
	          validateConfig(route.children, fullPath);
	      }
	  }
	  /**
	   * @param {?} parentPath
	   * @param {?} currentRoute
	   * @return {?}
	   */
	  function getFullPath(parentPath, currentRoute) {
	      if (!currentRoute) {
	          return parentPath;
	      }
	      if (!parentPath && !currentRoute.path) {
	          return '';
	      }
	      else if (parentPath && !currentRoute.path) {
	          return parentPath + "/";
	      }
	      else if (!parentPath && currentRoute.path) {
	          return currentRoute.path;
	      }
	      else {
	          return parentPath + "/" + currentRoute.path;
	      }
	  }
	
	  /**
	   * @license undefined
	    * Copyright Google Inc. All Rights Reserved.
	    * *
	    * Use of this source code is governed by an MIT-style license that can be
	    * found in the LICENSE file at https://angular.io/license
	   */
	  var Tree = (function () {
	      /**
	       * @param {?} root
	       */
	      function Tree(root) {
	          this._root = root;
	      }
	      Object.defineProperty(Tree.prototype, "root", {
	          /**
	           * @return {?}
	           */
	          get: function () { return this._root.value; },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @param {?} t
	       * @return {?}
	       */
	      Tree.prototype.parent = function (t) {
	          var /** @type {?} */ p = this.pathFromRoot(t);
	          return p.length > 1 ? p[p.length - 2] : null;
	      };
	      /**
	       * @param {?} t
	       * @return {?}
	       */
	      Tree.prototype.children = function (t) {
	          var /** @type {?} */ n = findNode(t, this._root);
	          return n ? n.children.map(function (t) { return t.value; }) : [];
	      };
	      /**
	       * @param {?} t
	       * @return {?}
	       */
	      Tree.prototype.firstChild = function (t) {
	          var /** @type {?} */ n = findNode(t, this._root);
	          return n && n.children.length > 0 ? n.children[0].value : null;
	      };
	      /**
	       * @param {?} t
	       * @return {?}
	       */
	      Tree.prototype.siblings = function (t) {
	          var /** @type {?} */ p = findPath(t, this._root, []);
	          if (p.length < 2)
	              return [];
	          var /** @type {?} */ c = p[p.length - 2].children.map(function (c) { return c.value; });
	          return c.filter(function (cc) { return cc !== t; });
	      };
	      /**
	       * @param {?} t
	       * @return {?}
	       */
	      Tree.prototype.pathFromRoot = function (t) { return findPath(t, this._root, []).map(function (s) { return s.value; }); };
	      return Tree;
	  }());
	  /**
	   * @param {?} expected
	   * @param {?} c
	   * @return {?}
	   */
	  function findNode(expected, c) {
	      if (expected === c.value)
	          return c;
	      for (var _i = 0, _a = c.children; _i < _a.length; _i++) {
	          var cc = _a[_i];
	          var /** @type {?} */ r = findNode(expected, cc);
	          if (r)
	              return r;
	      }
	      return null;
	  }
	  /**
	   * @param {?} expected
	   * @param {?} c
	   * @param {?} collected
	   * @return {?}
	   */
	  function findPath(expected, c, collected) {
	      collected.push(c);
	      if (expected === c.value)
	          return collected;
	      for (var _i = 0, _a = c.children; _i < _a.length; _i++) {
	          var cc = _a[_i];
	          var /** @type {?} */ cloned = collected.slice(0);
	          var /** @type {?} */ r = findPath(expected, cc, cloned);
	          if (r.length > 0)
	              return r;
	      }
	      return [];
	  }
	  var TreeNode = (function () {
	      /**
	       * @param {?} value
	       * @param {?} children
	       */
	      function TreeNode(value, children) {
	          this.value = value;
	          this.children = children;
	      }
	      /**
	       * @return {?}
	       */
	      TreeNode.prototype.toString = function () { return "TreeNode(" + this.value + ")"; };
	      return TreeNode;
	  }());
	
	  /**
	   * @license
	   * Copyright Google Inc. All Rights Reserved.
	   *
	   * Use of this source code is governed by an MIT-style license that can be
	   * found in the LICENSE file at https://angular.io/license
	   */
	  var __extends$1 = (this && this.__extends) || function (d, b) {
	      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	      function __() { this.constructor = d; }
	      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	  };
	  /**
	   *  *
	    * *
	    * ```
	    * class MyComponent {
	    * constructor(router: Router) {
	    * const state: RouterState = router.routerState;
	    * const root: ActivatedRoute = state.root;
	    * const child = root.firstChild;
	    * const id: Observable<string> = child.params.map(p => p.id);
	    * //...
	    * }
	    * }
	    * ```
	    * *
	    * RouterState is a tree of activated routes. Every node in this tree knows about the "consumed" URL
	    * segments,
	    * the extracted parameters, and the resolved data.
	    * *
	    * See {@link ActivatedRoute} for more information.
	    * *
	   */
	  var RouterState = (function (_super) {
	      __extends$1(RouterState, _super);
	      /**
	       * @param {?} root
	       * @param {?} snapshot
	       */
	      function RouterState(root, snapshot) {
	          _super.call(this, root);
	          this.snapshot = snapshot;
	          setRouterStateSnapshot(this, root);
	      }
	      /**
	       * @return {?}
	       */
	      RouterState.prototype.toString = function () { return this.snapshot.toString(); };
	      return RouterState;
	  }(Tree));
	  /**
	   * @param {?} urlTree
	   * @param {?} rootComponent
	   * @return {?}
	   */
	  function createEmptyState(urlTree, rootComponent) {
	      var /** @type {?} */ snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
	      var /** @type {?} */ emptyUrl = new rxjs_BehaviorSubject.BehaviorSubject([new UrlSegment('', {})]);
	      var /** @type {?} */ emptyParams = new rxjs_BehaviorSubject.BehaviorSubject({});
	      var /** @type {?} */ emptyData = new rxjs_BehaviorSubject.BehaviorSubject({});
	      var /** @type {?} */ emptyQueryParams = new rxjs_BehaviorSubject.BehaviorSubject({});
	      var /** @type {?} */ fragment = new rxjs_BehaviorSubject.BehaviorSubject('');
	      var /** @type {?} */ activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
	      activated.snapshot = snapshot.root;
	      return new RouterState(new TreeNode(activated, []), snapshot);
	  }
	  /**
	   * @param {?} urlTree
	   * @param {?} rootComponent
	   * @return {?}
	   */
	  function createEmptyStateSnapshot(urlTree, rootComponent) {
	      var /** @type {?} */ emptyParams = {};
	      var /** @type {?} */ emptyData = {};
	      var /** @type {?} */ emptyQueryParams = {};
	      var /** @type {?} */ fragment = '';
	      var /** @type {?} */ activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1, {});
	      return new RouterStateSnapshot('', new TreeNode(activated, []));
	  }
	  /**
	   *  outlet.
	    * ActivatedRoute can also be used to traverse the router state tree.
	    * *
	    * *
	    * ```
	    * class MyComponent {
	    * constructor(route: ActivatedRoute) {
	    * const id: Observable<string> = route.params.map(p => p.id);
	    * const url: Observable<string> = route.url.map(s => s.join(''));
	    * const user = route.data.map(d => d.user); //includes `data` and `resolve`
	    * }
	    * }
	    * ```
	    * *
	   */
	  var ActivatedRoute = (function () {
	      /**
	       * @param {?} url
	       * @param {?} params
	       * @param {?} queryParams
	       * @param {?} fragment
	       * @param {?} data
	       * @param {?} outlet
	       * @param {?} component
	       * @param {?} futureSnapshot
	       */
	      function ActivatedRoute(url, params, queryParams, fragment, data, outlet, component, // TODO: vsavkin: remove |string
	          futureSnapshot) {
	          this.url = url;
	          this.params = params;
	          this.queryParams = queryParams;
	          this.fragment = fragment;
	          this.data = data;
	          this.outlet = outlet;
	          this.component = component;
	          this._futureSnapshot = futureSnapshot;
	      }
	      Object.defineProperty(ActivatedRoute.prototype, "routeConfig", {
	          /**
	           *  The configuration used to match this route.
	           * @return {?}
	           */
	          get: function () { return this._futureSnapshot.routeConfig; },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRoute.prototype, "root", {
	          /**
	           *  The root of the router state.
	           * @return {?}
	           */
	          get: function () { return this._routerState.root; },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRoute.prototype, "parent", {
	          /**
	           *  The parent of this route in the router state tree.
	           * @return {?}
	           */
	          get: function () { return this._routerState.parent(this); },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRoute.prototype, "firstChild", {
	          /**
	           *  The first child of this route in the router state tree.
	           * @return {?}
	           */
	          get: function () { return this._routerState.firstChild(this); },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRoute.prototype, "children", {
	          /**
	           *  The children of this route in the router state tree.
	           * @return {?}
	           */
	          get: function () { return this._routerState.children(this); },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRoute.prototype, "pathFromRoot", {
	          /**
	           *  The path from the root of the router state tree to this route.
	           * @return {?}
	           */
	          get: function () { return this._routerState.pathFromRoot(this); },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @return {?}
	       */
	      ActivatedRoute.prototype.toString = function () {
	          return this.snapshot ? this.snapshot.toString() : "Future(" + this._futureSnapshot + ")";
	      };
	      return ActivatedRoute;
	  }());
	  /**
	   * @param {?} route
	   * @return {?}
	   */
	  function inheritedParamsDataResolve(route) {
	      var /** @type {?} */ pathToRoot = route.pathFromRoot;
	      var /** @type {?} */ inhertingStartingFrom = pathToRoot.length - 1;
	      while (inhertingStartingFrom >= 1) {
	          var /** @type {?} */ current = pathToRoot[inhertingStartingFrom];
	          var /** @type {?} */ parent_1 = pathToRoot[inhertingStartingFrom - 1];
	          // current route is an empty path => inherits its parent's params and data
	          if (current.routeConfig && current.routeConfig.path === '') {
	              inhertingStartingFrom--;
	          }
	          else if (!parent_1.component) {
	              inhertingStartingFrom--;
	          }
	          else {
	              break;
	          }
	      }
	      return pathToRoot.slice(inhertingStartingFrom).reduce(function (res, curr) {
	          var /** @type {?} */ params = merge(res.params, curr.params);
	          var /** @type {?} */ data = merge(res.data, curr.data);
	          var /** @type {?} */ resolve = merge(res.resolve, curr._resolvedData);
	          return { params: params, data: data, resolve: resolve };
	      }, /** @type {?} */ ({ params: {}, data: {}, resolve: {} }));
	  }
	  /**
	   *  outlet
	    * at a particular moment in time. ActivatedRouteSnapshot can also be used to traverse the router
	    * state tree.
	    * *
	    * *
	    * ```
	    * class MyComponent {
	    * constructor(route: ActivatedRoute) {
	    * const id: string = route.snapshot.params.id;
	    * const url: string = route.snapshot.url.join('');
	    * const user = route.snapshot.data.user;
	    * }
	    * }
	    * ```
	    * *
	   */
	  var ActivatedRouteSnapshot = (function () {
	      /**
	       * @param {?} url
	       * @param {?} params
	       * @param {?} queryParams
	       * @param {?} fragment
	       * @param {?} data
	       * @param {?} outlet
	       * @param {?} component
	       * @param {?} routeConfig
	       * @param {?} urlSegment
	       * @param {?} lastPathIndex
	       * @param {?} resolve
	       */
	      function ActivatedRouteSnapshot(url, params, queryParams, fragment, data, outlet, component, routeConfig, urlSegment, lastPathIndex, resolve) {
	          this.url = url;
	          this.params = params;
	          this.queryParams = queryParams;
	          this.fragment = fragment;
	          this.data = data;
	          this.outlet = outlet;
	          this.component = component;
	          this._routeConfig = routeConfig;
	          this._urlSegment = urlSegment;
	          this._lastPathIndex = lastPathIndex;
	          this._resolve = resolve;
	      }
	      Object.defineProperty(ActivatedRouteSnapshot.prototype, "routeConfig", {
	          /**
	           *  The configuration used to match this route.
	           * @return {?}
	           */
	          get: function () { return this._routeConfig; },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRouteSnapshot.prototype, "root", {
	          /**
	           *  The root of the router state.
	           * @return {?}
	           */
	          get: function () { return this._routerState.root; },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRouteSnapshot.prototype, "parent", {
	          /**
	           *  The parent of this route in the router state tree.
	           * @return {?}
	           */
	          get: function () { return this._routerState.parent(this); },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRouteSnapshot.prototype, "firstChild", {
	          /**
	           *  The first child of this route in the router state tree.
	           * @return {?}
	           */
	          get: function () { return this._routerState.firstChild(this); },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRouteSnapshot.prototype, "children", {
	          /**
	           *  The children of this route in the router state tree.
	           * @return {?}
	           */
	          get: function () { return this._routerState.children(this); },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(ActivatedRouteSnapshot.prototype, "pathFromRoot", {
	          /**
	           *  The path from the root of the router state tree to this route.
	           * @return {?}
	           */
	          get: function () { return this._routerState.pathFromRoot(this); },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @return {?}
	       */
	      ActivatedRouteSnapshot.prototype.toString = function () {
	          var /** @type {?} */ url = this.url.map(function (s) { return s.toString(); }).join('/');
	          var /** @type {?} */ matched = this._routeConfig ? this._routeConfig.path : '';
	          return "Route(url:'" + url + "', path:'" + matched + "')";
	      };
	      return ActivatedRouteSnapshot;
	  }());
	  /**
	   *  *
	    * *
	    * ```
	    * class MyComponent {
	    * constructor(router: Router) {
	    * const state: RouterState = router.routerState;
	    * const snapshot: RouterStateSnapshot = state.snapshot;
	    * const root: ActivatedRouteSnapshot = snapshot.root;
	    * const child = root.firstChild;
	    * const id: Observable<string> = child.params.map(p => p.id);
	    * //...
	    * }
	    * }
	    * ```
	    * *
	    * RouterStateSnapshot is a tree of activated route snapshots. Every node in this tree knows about
	    * the "consumed" URL segments, the extracted parameters, and the resolved data.
	    * *
	   */
	  var RouterStateSnapshot = (function (_super) {
	      __extends$1(RouterStateSnapshot, _super);
	      /**
	       * @param {?} url
	       * @param {?} root
	       */
	      function RouterStateSnapshot(url, root) {
	          _super.call(this, root);
	          this.url = url;
	          setRouterStateSnapshot(this, root);
	      }
	      /**
	       * @return {?}
	       */
	      RouterStateSnapshot.prototype.toString = function () { return serializeNode(this._root); };
	      return RouterStateSnapshot;
	  }(Tree));
	  /**
	   * @param {?} state
	   * @param {?} node
	   * @return {?}
	   */
	  function setRouterStateSnapshot(state, node) {
	      node.value._routerState = state;
	      node.children.forEach(function (c) { return setRouterStateSnapshot(state, c); });
	  }
	  /**
	   * @param {?} node
	   * @return {?}
	   */
	  function serializeNode(node) {
	      var /** @type {?} */ c = node.children.length > 0 ? " { " + node.children.map(serializeNode).join(", ") + " } " : '';
	      return "" + node.value + c;
	  }
	  /**
	   *  The expectation is that the activate route is created with the right set of parameters.
	    * So we push new values into the observables only when they are not the initial values.
	    * And we detect that by checking if the snapshot field is set.
	   * @param {?} route
	   * @return {?}
	   */
	  function advanceActivatedRoute(route) {
	      if (route.snapshot) {
	          if (!shallowEqual(route.snapshot.queryParams, route._futureSnapshot.queryParams)) {
	              ((route.queryParams)).next(route._futureSnapshot.queryParams);
	          }
	          if (route.snapshot.fragment !== route._futureSnapshot.fragment) {
	              ((route.fragment)).next(route._futureSnapshot.fragment);
	          }
	          if (!shallowEqual(route.snapshot.params, route._futureSnapshot.params)) {
	              ((route.params)).next(route._futureSnapshot.params);
	          }
	          if (!shallowEqualArrays(route.snapshot.url, route._futureSnapshot.url)) {
	              ((route.url)).next(route._futureSnapshot.url);
	          }
	          if (!equalParamsAndUrlSegments(route.snapshot, route._futureSnapshot)) {
	              ((route.data)).next(route._futureSnapshot.data);
	          }
	          route.snapshot = route._futureSnapshot;
	      }
	      else {
	          route.snapshot = route._futureSnapshot;
	          // this is for resolved data
	          ((route.data)).next(route._futureSnapshot.data);
	      }
	  }
	  /**
	   * @param {?} a
	   * @param {?} b
	   * @return {?}
	   */
	  function equalParamsAndUrlSegments(a, b) {
	      return shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
	  }
	
	  /**
	   * @param {?} routeReuseStrategy
	   * @param {?} curr
	   * @param {?} prevState
	   * @return {?}
	   */
	  function createRouterState(routeReuseStrategy, curr, prevState) {
	      var /** @type {?} */ root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : undefined);
	      return new RouterState(root, curr);
	  }
	  /**
	   * @param {?} routeReuseStrategy
	   * @param {?} curr
	   * @param {?=} prevState
	   * @return {?}
	   */
	  function createNode(routeReuseStrategy, curr, prevState) {
	      // reuse an activated route that is currently displayed on the screen
	      if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
	          var /** @type {?} */ value = prevState.value;
	          value._futureSnapshot = curr.value;
	          var /** @type {?} */ children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
	          return new TreeNode(value, children);
	      }
	      else if (routeReuseStrategy.retrieve(curr.value)) {
	          var /** @type {?} */ tree = ((routeReuseStrategy.retrieve(curr.value))).route;
	          setFutureSnapshotsOfActivatedRoutes(curr, tree);
	          return tree;
	      }
	      else {
	          var /** @type {?} */ value = createActivatedRoute(curr.value);
	          var /** @type {?} */ children = curr.children.map(function (c) { return createNode(routeReuseStrategy, c); });
	          return new TreeNode(value, children);
	      }
	  }
	  /**
	   * @param {?} curr
	   * @param {?} result
	   * @return {?}
	   */
	  function setFutureSnapshotsOfActivatedRoutes(curr, result) {
	      if (curr.value.routeConfig !== result.value.routeConfig) {
	          throw new Error('Cannot reattach ActivatedRouteSnapshot created from a different route');
	      }
	      if (curr.children.length !== result.children.length) {
	          throw new Error('Cannot reattach ActivatedRouteSnapshot with a different number of children');
	      }
	      result.value._futureSnapshot = curr.value;
	      for (var /** @type {?} */ i = 0; i < curr.children.length; ++i) {
	          setFutureSnapshotsOfActivatedRoutes(curr.children[i], result.children[i]);
	      }
	  }
	  /**
	   * @param {?} routeReuseStrategy
	   * @param {?} curr
	   * @param {?} prevState
	   * @return {?}
	   */
	  function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
	      return curr.children.map(function (child) {
	          for (var _i = 0, _a = prevState.children; _i < _a.length; _i++) {
	              var p = _a[_i];
	              if (routeReuseStrategy.shouldReuseRoute(p.value.snapshot, child.value)) {
	                  return createNode(routeReuseStrategy, child, p);
	              }
	          }
	          return createNode(routeReuseStrategy, child);
	      });
	  }
	  /**
	   * @param {?} c
	   * @return {?}
	   */
	  function createActivatedRoute(c) {
	      return new ActivatedRoute(new rxjs_BehaviorSubject.BehaviorSubject(c.url), new rxjs_BehaviorSubject.BehaviorSubject(c.params), new rxjs_BehaviorSubject.BehaviorSubject(c.queryParams), new rxjs_BehaviorSubject.BehaviorSubject(c.fragment), new rxjs_BehaviorSubject.BehaviorSubject(c.data), c.outlet, c.component, c);
	  }
	
	  /**
	   * @param {?} route
	   * @param {?} urlTree
	   * @param {?} commands
	   * @param {?} queryParams
	   * @param {?} fragment
	   * @return {?}
	   */
	  function createUrlTree(route, urlTree, commands, queryParams, fragment) {
	      if (commands.length === 0) {
	          return tree(urlTree.root, urlTree.root, urlTree, queryParams, fragment);
	      }
	      var /** @type {?} */ normalizedCommands = normalizeCommands(commands);
	      validateCommands(normalizedCommands);
	      if (navigateToRoot(normalizedCommands)) {
	          return tree(urlTree.root, new UrlSegmentGroup([], {}), urlTree, queryParams, fragment);
	      }
	      var /** @type {?} */ startingPosition = findStartingPosition(normalizedCommands, urlTree, route);
	      var /** @type {?} */ segmentGroup = startingPosition.processChildren ?
	          updateSegmentGroupChildren(startingPosition.segmentGroup, startingPosition.index, normalizedCommands.commands) :
	          updateSegmentGroup(startingPosition.segmentGroup, startingPosition.index, normalizedCommands.commands);
	      return tree(startingPosition.segmentGroup, segmentGroup, urlTree, queryParams, fragment);
	  }
	  /**
	   * @param {?} n
	   * @return {?}
	   */
	  function validateCommands(n) {
	      if (n.isAbsolute && n.commands.length > 0 && isMatrixParams(n.commands[0])) {
	          throw new Error('Root segment cannot have matrix parameters');
	      }
	      var /** @type {?} */ c = n.commands.filter(function (c) { return typeof c === 'object' && c.outlets !== undefined; });
	      if (c.length > 0 && c[0] !== n.commands[n.commands.length - 1]) {
	          throw new Error('{outlets:{}} has to be the last command');
	      }
	  }
	  /**
	   * @param {?} command
	   * @return {?}
	   */
	  function isMatrixParams(command) {
	      return typeof command === 'object' && command.outlets === undefined &&
	          command.segmentPath === undefined;
	  }
	  /**
	   * @param {?} oldSegmentGroup
	   * @param {?} newSegmentGroup
	   * @param {?} urlTree
	   * @param {?} queryParams
	   * @param {?} fragment
	   * @return {?}
	   */
	  function tree(oldSegmentGroup, newSegmentGroup, urlTree, queryParams, fragment) {
	      if (urlTree.root === oldSegmentGroup) {
	          return new UrlTree(newSegmentGroup, stringify(queryParams), fragment);
	      }
	      else {
	          return new UrlTree(replaceSegment(urlTree.root, oldSegmentGroup, newSegmentGroup), stringify(queryParams), fragment);
	      }
	  }
	  /**
	   * @param {?} current
	   * @param {?} oldSegment
	   * @param {?} newSegment
	   * @return {?}
	   */
	  function replaceSegment(current, oldSegment, newSegment) {
	      var /** @type {?} */ children = {};
	      forEach(current.children, function (c, outletName) {
	          if (c === oldSegment) {
	              children[outletName] = newSegment;
	          }
	          else {
	              children[outletName] = replaceSegment(c, oldSegment, newSegment);
	          }
	      });
	      return new UrlSegmentGroup(current.segments, children);
	  }
	  /**
	   * @param {?} normalizedChange
	   * @return {?}
	   */
	  function navigateToRoot(normalizedChange) {
	      return normalizedChange.isAbsolute && normalizedChange.commands.length === 1 &&
	          normalizedChange.commands[0] == '/';
	  }
	  var NormalizedNavigationCommands = (function () {
	      /**
	       * @param {?} isAbsolute
	       * @param {?} numberOfDoubleDots
	       * @param {?} commands
	       */
	      function NormalizedNavigationCommands(isAbsolute, numberOfDoubleDots, commands) {
	          this.isAbsolute = isAbsolute;
	          this.numberOfDoubleDots = numberOfDoubleDots;
	          this.commands = commands;
	      }
	      return NormalizedNavigationCommands;
	  }());
	  /**
	   * @param {?} commands
	   * @return {?}
	   */
	  function normalizeCommands(commands) {
	      if ((typeof commands[0] === 'string') && commands.length === 1 && commands[0] == '/') {
	          return new NormalizedNavigationCommands(true, 0, commands);
	      }
	      var /** @type {?} */ numberOfDoubleDots = 0;
	      var /** @type {?} */ isAbsolute = false;
	      var /** @type {?} */ res = [];
	      var _loop_1 = function(i) {
	          var /** @type {?} */ c = commands[i];
	          if (typeof c === 'object' && c.outlets !== undefined) {
	              var /** @type {?} */ r_1 = {};
	              forEach(c.outlets, function (commands, name) {
	                  if (typeof commands === 'string') {
	                      r_1[name] = commands.split('/');
	                  }
	                  else {
	                      r_1[name] = commands;
	                  }
	              });
	              res.push({ outlets: r_1 });
	              return "continue";
	          }
	          if (typeof c === 'object' && c.segmentPath !== undefined) {
	              res.push(c.segmentPath);
	              return "continue";
	          }
	          if (!(typeof c === 'string')) {
	              res.push(c);
	              return "continue";
	          }
	          if (i === 0) {
	              var /** @type {?} */ parts = c.split('/');
	              for (var /** @type {?} */ j = 0; j < parts.length; ++j) {
	                  var /** @type {?} */ cc = parts[j];
	                  if (j == 0 && cc == '.') {
	                  }
	                  else if (j == 0 && cc == '') {
	                      isAbsolute = true;
	                  }
	                  else if (cc == '..') {
	                      numberOfDoubleDots++;
	                  }
	                  else if (cc != '') {
	                      res.push(cc);
	                  }
	              }
	          }
	          else {
	              res.push(c);
	          }
	      };
	      for (var /** @type {?} */ i = 0; i < commands.length; ++i) {
	          _loop_1(i);
	      }
	      return new NormalizedNavigationCommands(isAbsolute, numberOfDoubleDots, res);
	  }
	  var Position = (function () {
	      /**
	       * @param {?} segmentGroup
	       * @param {?} processChildren
	       * @param {?} index
	       */
	      function Position(segmentGroup, processChildren, index) {
	          this.segmentGroup = segmentGroup;
	          this.processChildren = processChildren;
	          this.index = index;
	      }
	      return Position;
	  }());
	  /**
	   * @param {?} normalizedChange
	   * @param {?} urlTree
	   * @param {?} route
	   * @return {?}
	   */
	  function findStartingPosition(normalizedChange, urlTree, route) {
	      if (normalizedChange.isAbsolute) {
	          return new Position(urlTree.root, true, 0);
	      }
	      else if (route.snapshot._lastPathIndex === -1) {
	          return new Position(route.snapshot._urlSegment, true, 0);
	      }
	      else {
	          var /** @type {?} */ modifier = isMatrixParams(normalizedChange.commands[0]) ? 0 : 1;
	          var /** @type {?} */ index = route.snapshot._lastPathIndex + modifier;
	          return createPositionApplyingDoubleDots(route.snapshot._urlSegment, index, normalizedChange.numberOfDoubleDots);
	      }
	  }
	  /**
	   * @param {?} group
	   * @param {?} index
	   * @param {?} numberOfDoubleDots
	   * @return {?}
	   */
	  function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
	      var /** @type {?} */ g = group;
	      var /** @type {?} */ ci = index;
	      var /** @type {?} */ dd = numberOfDoubleDots;
	      while (dd > ci) {
	          dd -= ci;
	          g = g.parent;
	          if (!g) {
	              throw new Error('Invalid number of \'../\'');
	          }
	          ci = g.segments.length;
	      }
	      return new Position(g, false, ci - dd);
	  }
	  /**
	   * @param {?} command
	   * @return {?}
	   */
	  function getPath(command) {
	      if (typeof command === 'object' && command.outlets)
	          return command.outlets[PRIMARY_OUTLET];
	      return "" + command;
	  }
	  /**
	   * @param {?} commands
	   * @return {?}
	   */
	  function getOutlets(commands) {
	      if (!(typeof commands[0] === 'object'))
	          return (_a = {}, _a[PRIMARY_OUTLET] = commands, _a);
	      if (commands[0].outlets === undefined)
	          return (_b = {}, _b[PRIMARY_OUTLET] = commands, _b);
	      return commands[0].outlets;
	      var _a, _b;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} startIndex
	   * @param {?} commands
	   * @return {?}
	   */
	  function updateSegmentGroup(segmentGroup, startIndex, commands) {
	      if (!segmentGroup) {
	          segmentGroup = new UrlSegmentGroup([], {});
	      }
	      if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
	          return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
	      }
	      var /** @type {?} */ m = prefixedWith(segmentGroup, startIndex, commands);
	      var /** @type {?} */ slicedCommands = commands.slice(m.commandIndex);
	      if (m.match && m.pathIndex < segmentGroup.segments.length) {
	          var /** @type {?} */ g = new UrlSegmentGroup(segmentGroup.segments.slice(0, m.pathIndex), {});
	          g.children[PRIMARY_OUTLET] =
	              new UrlSegmentGroup(segmentGroup.segments.slice(m.pathIndex), segmentGroup.children);
	          return updateSegmentGroupChildren(g, 0, slicedCommands);
	      }
	      else if (m.match && slicedCommands.length === 0) {
	          return new UrlSegmentGroup(segmentGroup.segments, {});
	      }
	      else if (m.match && !segmentGroup.hasChildren()) {
	          return createNewSegmentGroup(segmentGroup, startIndex, commands);
	      }
	      else if (m.match) {
	          return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
	      }
	      else {
	          return createNewSegmentGroup(segmentGroup, startIndex, commands);
	      }
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} startIndex
	   * @param {?} commands
	   * @return {?}
	   */
	  function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
	      if (commands.length === 0) {
	          return new UrlSegmentGroup(segmentGroup.segments, {});
	      }
	      else {
	          var /** @type {?} */ outlets_1 = getOutlets(commands);
	          var /** @type {?} */ children_1 = {};
	          forEach(outlets_1, function (commands, outlet) {
	              if (commands !== null) {
	                  children_1[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands);
	              }
	          });
	          forEach(segmentGroup.children, function (child, childOutlet) {
	              if (outlets_1[childOutlet] === undefined) {
	                  children_1[childOutlet] = child;
	              }
	          });
	          return new UrlSegmentGroup(segmentGroup.segments, children_1);
	      }
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} startIndex
	   * @param {?} commands
	   * @return {?}
	   */
	  function prefixedWith(segmentGroup, startIndex, commands) {
	      var /** @type {?} */ currentCommandIndex = 0;
	      var /** @type {?} */ currentPathIndex = startIndex;
	      var /** @type {?} */ noMatch = { match: false, pathIndex: 0, commandIndex: 0 };
	      while (currentPathIndex < segmentGroup.segments.length) {
	          if (currentCommandIndex >= commands.length)
	              return noMatch;
	          var /** @type {?} */ path = segmentGroup.segments[currentPathIndex];
	          var /** @type {?} */ curr = getPath(commands[currentCommandIndex]);
	          var /** @type {?} */ next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
	          if (currentPathIndex > 0 && curr === undefined)
	              break;
	          if (curr && next && (typeof next === 'object') && next.outlets === undefined) {
	              if (!compare(curr, next, path))
	                  return noMatch;
	              currentCommandIndex += 2;
	          }
	          else {
	              if (!compare(curr, {}, path))
	                  return noMatch;
	              currentCommandIndex++;
	          }
	          currentPathIndex++;
	      }
	      return { match: true, pathIndex: currentPathIndex, commandIndex: currentCommandIndex };
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} startIndex
	   * @param {?} commands
	   * @return {?}
	   */
	  function createNewSegmentGroup(segmentGroup, startIndex, commands) {
	      var /** @type {?} */ paths = segmentGroup.segments.slice(0, startIndex);
	      var /** @type {?} */ i = 0;
	      while (i < commands.length) {
	          if (typeof commands[i] === 'object' && commands[i].outlets !== undefined) {
	              var /** @type {?} */ children = createNewSegmentChldren(commands[i].outlets);
	              return new UrlSegmentGroup(paths, children);
	          }
	          // if we start with an object literal, we need to reuse the path part from the segment
	          if (i === 0 && isMatrixParams(commands[0])) {
	              var /** @type {?} */ p = segmentGroup.segments[startIndex];
	              paths.push(new UrlSegment(p.path, commands[0]));
	              i++;
	              continue;
	          }
	          var /** @type {?} */ curr = getPath(commands[i]);
	          var /** @type {?} */ next = (i < commands.length - 1) ? commands[i + 1] : null;
	          if (curr && next && isMatrixParams(next)) {
	              paths.push(new UrlSegment(curr, stringify(next)));
	              i += 2;
	          }
	          else {
	              paths.push(new UrlSegment(curr, {}));
	              i++;
	          }
	      }
	      return new UrlSegmentGroup(paths, {});
	  }
	  /**
	   * @param {?} outlets
	   * @return {?}
	   */
	  function createNewSegmentChldren(outlets) {
	      var /** @type {?} */ children = {};
	      forEach(outlets, function (commands, outlet) {
	          if (commands !== null) {
	              children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
	          }
	      });
	      return children;
	  }
	  /**
	   * @param {?} params
	   * @return {?}
	   */
	  function stringify(params) {
	      var /** @type {?} */ res = {};
	      forEach(params, function (v, k) { return res[k] = "" + v; });
	      return res;
	  }
	  /**
	   * @param {?} path
	   * @param {?} params
	   * @param {?} segment
	   * @return {?}
	   */
	  function compare(path, params, segment) {
	      return path == segment.path && shallowEqual(params, segment.parameters);
	  }
	
	  var NoMatch$1 = (function () {
	      function NoMatch() {
	      }
	      return NoMatch;
	  }());
	  /**
	   * @param {?} rootComponentType
	   * @param {?} config
	   * @param {?} urlTree
	   * @param {?} url
	   * @return {?}
	   */
	  function recognize(rootComponentType, config, urlTree, url) {
	      return new Recognizer(rootComponentType, config, urlTree, url).recognize();
	  }
	  var Recognizer = (function () {
	      /**
	       * @param {?} rootComponentType
	       * @param {?} config
	       * @param {?} urlTree
	       * @param {?} url
	       */
	      function Recognizer(rootComponentType, config, urlTree, url) {
	          this.rootComponentType = rootComponentType;
	          this.config = config;
	          this.urlTree = urlTree;
	          this.url = url;
	      }
	      /**
	       * @return {?}
	       */
	      Recognizer.prototype.recognize = function () {
	          try {
	              var /** @type {?} */ rootSegmentGroup = split$1(this.urlTree.root, [], [], this.config).segmentGroup;
	              var /** @type {?} */ children = this.processSegmentGroup(this.config, rootSegmentGroup, PRIMARY_OUTLET);
	              var /** @type {?} */ root = new ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, {}, PRIMARY_OUTLET, this.rootComponentType, null, this.urlTree.root, -1, {});
	              var /** @type {?} */ rootNode = new TreeNode(root, children);
	              var /** @type {?} */ routeState = new RouterStateSnapshot(this.url, rootNode);
	              this.inheriteParamsAndData(routeState._root);
	              return rxjs_observable_of.of(routeState);
	          }
	          catch (e) {
	              return new rxjs_Observable.Observable(function (obs) { return obs.error(e); });
	          }
	      };
	      /**
	       * @param {?} routeNode
	       * @return {?}
	       */
	      Recognizer.prototype.inheriteParamsAndData = function (routeNode) {
	          var _this = this;
	          var /** @type {?} */ route = routeNode.value;
	          var /** @type {?} */ i = inheritedParamsDataResolve(route);
	          route.params = Object.freeze(i.params);
	          route.data = Object.freeze(i.data);
	          routeNode.children.forEach(function (n) { return _this.inheriteParamsAndData(n); });
	      };
	      /**
	       * @param {?} config
	       * @param {?} segmentGroup
	       * @param {?} outlet
	       * @return {?}
	       */
	      Recognizer.prototype.processSegmentGroup = function (config, segmentGroup, outlet) {
	          if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
	              return this.processChildren(config, segmentGroup);
	          }
	          else {
	              return this.processSegment(config, segmentGroup, segmentGroup.segments, outlet);
	          }
	      };
	      /**
	       * @param {?} config
	       * @param {?} segmentGroup
	       * @return {?}
	       */
	      Recognizer.prototype.processChildren = function (config, segmentGroup) {
	          var _this = this;
	          var /** @type {?} */ children = mapChildrenIntoArray(segmentGroup, function (child, childOutlet) { return _this.processSegmentGroup(config, child, childOutlet); });
	          checkOutletNameUniqueness(children);
	          sortActivatedRouteSnapshots(children);
	          return children;
	      };
	      /**
	       * @param {?} config
	       * @param {?} segmentGroup
	       * @param {?} segments
	       * @param {?} outlet
	       * @return {?}
	       */
	      Recognizer.prototype.processSegment = function (config, segmentGroup, segments, outlet) {
	          for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
	              var r = config_1[_i];
	              try {
	                  return this.processSegmentAgainstRoute(r, segmentGroup, segments, outlet);
	              }
	              catch (e) {
	                  if (!(e instanceof NoMatch$1))
	                      throw e;
	              }
	          }
	          if (this.noLeftoversInUrl(segmentGroup, segments, outlet)) {
	              return [];
	          }
	          else {
	              throw new NoMatch$1();
	          }
	      };
	      /**
	       * @param {?} segmentGroup
	       * @param {?} segments
	       * @param {?} outlet
	       * @return {?}
	       */
	      Recognizer.prototype.noLeftoversInUrl = function (segmentGroup, segments, outlet) {
	          return segments.length === 0 && !segmentGroup.children[outlet];
	      };
	      /**
	       * @param {?} route
	       * @param {?} rawSegment
	       * @param {?} segments
	       * @param {?} outlet
	       * @return {?}
	       */
	      Recognizer.prototype.processSegmentAgainstRoute = function (route, rawSegment, segments, outlet) {
	          if (route.redirectTo)
	              throw new NoMatch$1();
	          if ((route.outlet ? route.outlet : PRIMARY_OUTLET) !== outlet)
	              throw new NoMatch$1();
	          if (route.path === '**') {
	              var /** @type {?} */ params = segments.length > 0 ? last(segments).parameters : {};
	              var /** @type {?} */ snapshot_1 = new ActivatedRouteSnapshot(segments, params, Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, getData(route), outlet, route.component, route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + segments.length, getResolve(route));
	              return [new TreeNode(snapshot_1, [])];
	          }
	          var _a = match$1(rawSegment, route, segments), consumedSegments = _a.consumedSegments, parameters = _a.parameters, lastChild = _a.lastChild;
	          var /** @type {?} */ rawSlicedSegments = segments.slice(lastChild);
	          var /** @type {?} */ childConfig = getChildConfig(route);
	          var _b = split$1(rawSegment, consumedSegments, rawSlicedSegments, childConfig), segmentGroup = _b.segmentGroup, slicedSegments = _b.slicedSegments;
	          var /** @type {?} */ snapshot = new ActivatedRouteSnapshot(consumedSegments, parameters, Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, getData(route), outlet, route.component, route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + consumedSegments.length, getResolve(route));
	          if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
	              var /** @type {?} */ children = this.processChildren(childConfig, segmentGroup);
	              return [new TreeNode(snapshot, children)];
	          }
	          else if (childConfig.length === 0 && slicedSegments.length === 0) {
	              return [new TreeNode(snapshot, [])];
	          }
	          else {
	              var /** @type {?} */ children = this.processSegment(childConfig, segmentGroup, slicedSegments, PRIMARY_OUTLET);
	              return [new TreeNode(snapshot, children)];
	          }
	      };
	      return Recognizer;
	  }());
	  /**
	   * @param {?} nodes
	   * @return {?}
	   */
	  function sortActivatedRouteSnapshots(nodes) {
	      nodes.sort(function (a, b) {
	          if (a.value.outlet === PRIMARY_OUTLET)
	              return -1;
	          if (b.value.outlet === PRIMARY_OUTLET)
	              return 1;
	          return a.value.outlet.localeCompare(b.value.outlet);
	      });
	  }
	  /**
	   * @param {?} route
	   * @return {?}
	   */
	  function getChildConfig(route) {
	      if (route.children) {
	          return route.children;
	      }
	      else if (route.loadChildren) {
	          return ((route))._loadedConfig.routes;
	      }
	      else {
	          return [];
	      }
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} route
	   * @param {?} segments
	   * @return {?}
	   */
	  function match$1(segmentGroup, route, segments) {
	      if (route.path === '') {
	          if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || segments.length > 0)) {
	              throw new NoMatch$1();
	          }
	          else {
	              return { consumedSegments: [], lastChild: 0, parameters: {} };
	          }
	      }
	      var /** @type {?} */ matcher = route.matcher || defaultUrlMatcher;
	      var /** @type {?} */ res = matcher(segments, segmentGroup, route);
	      if (!res)
	          throw new NoMatch$1();
	      var /** @type {?} */ posParams = {};
	      forEach(res.posParams, function (v, k) { posParams[k] = v.path; });
	      var /** @type {?} */ parameters = merge(posParams, res.consumed[res.consumed.length - 1].parameters);
	      return { consumedSegments: res.consumed, lastChild: res.consumed.length, parameters: parameters };
	  }
	  /**
	   * @param {?} nodes
	   * @return {?}
	   */
	  function checkOutletNameUniqueness(nodes) {
	      var /** @type {?} */ names = {};
	      nodes.forEach(function (n) {
	          var /** @type {?} */ routeWithSameOutletName = names[n.value.outlet];
	          if (routeWithSameOutletName) {
	              var /** @type {?} */ p = routeWithSameOutletName.url.map(function (s) { return s.toString(); }).join('/');
	              var /** @type {?} */ c = n.value.url.map(function (s) { return s.toString(); }).join('/');
	              throw new Error("Two segments cannot have the same outlet name: '" + p + "' and '" + c + "'.");
	          }
	          names[n.value.outlet] = n.value;
	      });
	  }
	  /**
	   * @param {?} segmentGroup
	   * @return {?}
	   */
	  function getSourceSegmentGroup(segmentGroup) {
	      var /** @type {?} */ s = segmentGroup;
	      while (s._sourceSegment) {
	          s = s._sourceSegment;
	      }
	      return s;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @return {?}
	   */
	  function getPathIndexShift(segmentGroup) {
	      var /** @type {?} */ s = segmentGroup;
	      var /** @type {?} */ res = (s._segmentIndexShift ? s._segmentIndexShift : 0);
	      while (s._sourceSegment) {
	          s = s._sourceSegment;
	          res += (s._segmentIndexShift ? s._segmentIndexShift : 0);
	      }
	      return res - 1;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} consumedSegments
	   * @param {?} slicedSegments
	   * @param {?} config
	   * @return {?}
	   */
	  function split$1(segmentGroup, consumedSegments, slicedSegments, config) {
	      if (slicedSegments.length > 0 &&
	          containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
	          var /** @type {?} */ s = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(segmentGroup, consumedSegments, config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
	          s._sourceSegment = segmentGroup;
	          s._segmentIndexShift = consumedSegments.length;
	          return { segmentGroup: s, slicedSegments: [] };
	      }
	      else if (slicedSegments.length === 0 &&
	          containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
	          var /** @type {?} */ s = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
	          s._sourceSegment = segmentGroup;
	          s._segmentIndexShift = consumedSegments.length;
	          return { segmentGroup: s, slicedSegments: slicedSegments };
	      }
	      else {
	          var /** @type {?} */ s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
	          s._sourceSegment = segmentGroup;
	          s._segmentIndexShift = consumedSegments.length;
	          return { segmentGroup: s, slicedSegments: slicedSegments };
	      }
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} slicedSegments
	   * @param {?} routes
	   * @param {?} children
	   * @return {?}
	   */
	  function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
	      var /** @type {?} */ res = {};
	      for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
	          var r = routes_1[_i];
	          if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet$2(r)]) {
	              var /** @type {?} */ s = new UrlSegmentGroup([], {});
	              s._sourceSegment = segmentGroup;
	              s._segmentIndexShift = segmentGroup.segments.length;
	              res[getOutlet$2(r)] = s;
	          }
	      }
	      return merge(children, res);
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} consumedSegments
	   * @param {?} routes
	   * @param {?} primarySegment
	   * @return {?}
	   */
	  function createChildrenForEmptyPaths(segmentGroup, consumedSegments, routes, primarySegment) {
	      var /** @type {?} */ res = {};
	      res[PRIMARY_OUTLET] = primarySegment;
	      primarySegment._sourceSegment = segmentGroup;
	      primarySegment._segmentIndexShift = consumedSegments.length;
	      for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
	          var r = routes_2[_i];
	          if (r.path === '' && getOutlet$2(r) !== PRIMARY_OUTLET) {
	              var /** @type {?} */ s = new UrlSegmentGroup([], {});
	              s._sourceSegment = segmentGroup;
	              s._segmentIndexShift = consumedSegments.length;
	              res[getOutlet$2(r)] = s;
	          }
	      }
	      return res;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} slicedSegments
	   * @param {?} routes
	   * @return {?}
	   */
	  function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
	      return routes
	          .filter(function (r) { return emptyPathMatch(segmentGroup, slicedSegments, r) &&
	          getOutlet$2(r) !== PRIMARY_OUTLET; })
	          .length > 0;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} slicedSegments
	   * @param {?} routes
	   * @return {?}
	   */
	  function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
	      return routes.filter(function (r) { return emptyPathMatch(segmentGroup, slicedSegments, r); }).length > 0;
	  }
	  /**
	   * @param {?} segmentGroup
	   * @param {?} slicedSegments
	   * @param {?} r
	   * @return {?}
	   */
	  function emptyPathMatch(segmentGroup, slicedSegments, r) {
	      if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full')
	          return false;
	      return r.path === '' && r.redirectTo === undefined;
	  }
	  /**
	   * @param {?} route
	   * @return {?}
	   */
	  function getOutlet$2(route) {
	      return route.outlet ? route.outlet : PRIMARY_OUTLET;
	  }
	  /**
	   * @param {?} route
	   * @return {?}
	   */
	  function getData(route) {
	      return route.data ? route.data : {};
	  }
	  /**
	   * @param {?} route
	   * @return {?}
	   */
	  function getResolve(route) {
	      return route.resolve ? route.resolve : {};
	  }
	
	  /**
	   * @license
	   * Copyright Google Inc. All Rights Reserved.
	   *
	   * Use of this source code is governed by an MIT-style license that can be
	   * found in the LICENSE file at https://angular.io/license
	   */
	  /**
	   *  *
	   */
	  var RouterOutletMap = (function () {
	      function RouterOutletMap() {
	          /** @internal */
	          this._outlets = {};
	      }
	      /**
	       *  Adds an outlet to this map.
	       * @param {?} name
	       * @param {?} outlet
	       * @return {?}
	       */
	      RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
	      /**
	       *  Removes an outlet from this map.
	       * @param {?} name
	       * @return {?}
	       */
	      RouterOutletMap.prototype.removeOutlet = function (name) { this._outlets[name] = undefined; };
	      return RouterOutletMap;
	  }());
	
	  /**
	   * @license
	   * Copyright Google Inc. All Rights Reserved.
	   *
	   * Use of this source code is governed by an MIT-style license that can be
	   * found in the LICENSE file at https://angular.io/license
	   */
	  /**
	   *  *
	   * @abstract
	   */
	  var UrlHandlingStrategy = (function () {
	      function UrlHandlingStrategy() {
	      }
	      /**
	       *  Tells the router if this URL should be processed.
	        * *
	        * When it returns true, the router will execute the regular navigation.
	        * When it returns false, the router will set the router state to an empty state.
	        * As a result, all the active components will be destroyed.
	        * *
	       * @abstract
	       * @param {?} url
	       * @return {?}
	       */
	      UrlHandlingStrategy.prototype.shouldProcessUrl = function (url) { };
	      /**
	       *  Extracts the part of the URL that should be handled by the router.
	        * The rest of the URL will remain untouched.
	       * @abstract
	       * @param {?} url
	       * @return {?}
	       */
	      UrlHandlingStrategy.prototype.extract = function (url) { };
	      /**
	       *  Merges the URL fragment with the rest of the URL.
	       * @abstract
	       * @param {?} newUrlPart
	       * @param {?} rawUrl
	       * @return {?}
	       */
	      UrlHandlingStrategy.prototype.merge = function (newUrlPart, rawUrl) { };
	      return UrlHandlingStrategy;
	  }());
	  /**
	   * @experimental
	   */
	  var DefaultUrlHandlingStrategy = (function () {
	      function DefaultUrlHandlingStrategy() {
	      }
	      /**
	       * @param {?} url
	       * @return {?}
	       */
	      DefaultUrlHandlingStrategy.prototype.shouldProcessUrl = function (url) { return true; };
	      /**
	       * @param {?} url
	       * @return {?}
	       */
	      DefaultUrlHandlingStrategy.prototype.extract = function (url) { return url; };
	      /**
	       * @param {?} newUrlPart
	       * @param {?} wholeUrl
	       * @return {?}
	       */
	      DefaultUrlHandlingStrategy.prototype.merge = function (newUrlPart, wholeUrl) { return newUrlPart; };
	      return DefaultUrlHandlingStrategy;
	  }());
	
	  /**
	   *  *
	   */
	  var NavigationStart = (function () {
	      /**
	       * @param {?} id
	       * @param {?} url
	       */
	      function NavigationStart(id, url) {
	          this.id = id;
	          this.url = url;
	      }
	      /**
	       * @return {?}
	       */
	      NavigationStart.prototype.toString = function () { return "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"; };
	      return NavigationStart;
	  }());
	  /**
	   *  *
	   */
	  var NavigationEnd = (function () {
	      /**
	       * @param {?} id
	       * @param {?} url
	       * @param {?} urlAfterRedirects
	       */
	      function NavigationEnd(id, url, urlAfterRedirects) {
	          this.id = id;
	          this.url = url;
	          this.urlAfterRedirects = urlAfterRedirects;
	      }
	      /**
	       * @return {?}
	       */
	      NavigationEnd.prototype.toString = function () {
	          return "NavigationEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "')";
	      };
	      return NavigationEnd;
	  }());
	  /**
	   *  *
	   */
	  var NavigationCancel = (function () {
	      /**
	       * @param {?} id
	       * @param {?} url
	       * @param {?} reason
	       */
	      function NavigationCancel(id, url, reason) {
	          this.id = id;
	          this.url = url;
	          this.reason = reason;
	      }
	      /**
	       * @return {?}
	       */
	      NavigationCancel.prototype.toString = function () { return "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"; };
	      return NavigationCancel;
	  }());
	  /**
	   *  *
	   */
	  var NavigationError = (function () {
	      /**
	       * @param {?} id
	       * @param {?} url
	       * @param {?} error
	       */
	      function NavigationError(id, url, error) {
	          this.id = id;
	          this.url = url;
	          this.error = error;
	      }
	      /**
	       * @return {?}
	       */
	      NavigationError.prototype.toString = function () {
	          return "NavigationError(id: " + this.id + ", url: '" + this.url + "', error: " + this.error + ")";
	      };
	      return NavigationError;
	  }());
	  /**
	   *  *
	   */
	  var RoutesRecognized = (function () {
	      /**
	       * @param {?} id
	       * @param {?} url
	       * @param {?} urlAfterRedirects
	       * @param {?} state
	       */
	      function RoutesRecognized(id, url, urlAfterRedirects, state) {
	          this.id = id;
	          this.url = url;
	          this.urlAfterRedirects = urlAfterRedirects;
	          this.state = state;
	      }
	      /**
	       * @return {?}
	       */
	      RoutesRecognized.prototype.toString = function () {
	          return "RoutesRecognized(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
	      };
	      return RoutesRecognized;
	  }());
	  /**
	   * @param {?} error
	   * @return {?}
	   */
	  function defaultErrorHandler(error) {
	      throw error;
	  }
	  /**
	   *  Does not detach any subtrees. Reuses routes as long as their route config is the same.
	   */
	  var DefaultRouteReuseStrategy = (function () {
	      function DefaultRouteReuseStrategy() {
	      }
	      /**
	       * @param {?} route
	       * @return {?}
	       */
	      DefaultRouteReuseStrategy.prototype.shouldDetach = function (route) { return false; };
	      /**
	       * @param {?} route
	       * @param {?} detachedTree
	       * @return {?}
	       */
	      DefaultRouteReuseStrategy.prototype.store = function (route, detachedTree) { };
	      /**
	       * @param {?} route
	       * @return {?}
	       */
	      DefaultRouteReuseStrategy.prototype.shouldAttach = function (route) { return false; };
	      /**
	       * @param {?} route
	       * @return {?}
	       */
	      DefaultRouteReuseStrategy.prototype.retrieve = function (route) { return null; };
	      /**
	       * @param {?} future
	       * @param {?} curr
	       * @return {?}
	       */
	      DefaultRouteReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
	          return future.routeConfig === curr.routeConfig;
	      };
	      return DefaultRouteReuseStrategy;
	  }());
	  /**
	   *  *
	    * See {@link Routes} for more details and examples.
	    * *
	    * *
	   */
	  var Router = (function () {
	      /**
	       * @param {?} rootComponentType
	       * @param {?} urlSerializer
	       * @param {?} outletMap
	       * @param {?} location
	       * @param {?} injector
	       * @param {?} loader
	       * @param {?} compiler
	       * @param {?} config
	       */
	      function Router(rootComponentType, urlSerializer, outletMap, location, injector, loader, compiler, config) {
	          this.rootComponentType = rootComponentType;
	          this.urlSerializer = urlSerializer;
	          this.outletMap = outletMap;
	          this.location = location;
	          this.injector = injector;
	          this.config = config;
	          this.navigations = new rxjs_BehaviorSubject.BehaviorSubject(null);
	          this.routerEvents = new rxjs_Subject.Subject();
	          this.navigationId = 0;
	          /**
	           * Error handler that is invoked when a navigation errors.
	           *
	           * See {@link ErrorHandler} for more information.
	           */
	          this.errorHandler = defaultErrorHandler;
	          /**
	           * Indicates if at least one navigation happened.
	           */
	          this.navigated = false;
	          /**
	           * Extracts and merges URLs. Used for Angular 1 to Angular 2 migrations.
	           */
	          this.urlHandlingStrategy = new DefaultUrlHandlingStrategy();
	          this.routeReuseStrategy = new DefaultRouteReuseStrategy();
	          this.resetConfig(config);
	          this.currentUrlTree = createEmptyUrlTree();
	          this.rawUrlTree = this.currentUrlTree;
	          this.configLoader = new RouterConfigLoader(loader, compiler);
	          this.currentRouterState = createEmptyState(this.currentUrlTree, this.rootComponentType);
	          this.processNavigations();
	      }
	      /**
	       *  TODO: this should be removed once the constructor of the router made internal
	       * @param {?} rootComponentType
	       * @return {?}
	       */
	      Router.prototype.resetRootComponentType = function (rootComponentType) {
	          this.rootComponentType = rootComponentType;
	          // TODO: vsavkin router 4.0 should make the root component set to null
	          // this will simplify the lifecycle of the router.
	          this.currentRouterState.root.component = this.rootComponentType;
	      };
	      /**
	       *  Sets up the location change listener and performs the initial navigation.
	       * @return {?}
	       */
	      Router.prototype.initialNavigation = function () {
	          this.setUpLocationChangeListener();
	          this.navigateByUrl(this.location.path(true), { replaceUrl: true });
	      };
	      /**
	       *  Sets up the location change listener.
	       * @return {?}
	       */
	      Router.prototype.setUpLocationChangeListener = function () {
	          var _this = this;
	          // Zone.current.wrap is needed because of the issue with RxJS scheduler,
	          // which does not work properly with zone.js in IE and Safari
	          if (!this.locationSubscription) {
	              this.locationSubscription = (this.location.subscribe(Zone.current.wrap(function (change) {
	                  var /** @type {?} */ rawUrlTree = _this.urlSerializer.parse(change['url']);
	                  var /** @type {?} */ lastNavigation = _this.navigations.value;
	                  // If the user triggers a navigation imperatively (e.g., by using navigateByUrl),
	                  // and that navigation results in 'replaceState' that leads to the same URL,
	                  // we should skip those.
	                  if (lastNavigation && lastNavigation.imperative &&
	                      lastNavigation.rawUrl.toString() === rawUrlTree.toString()) {
	                      return;
	                  }
	                  setTimeout(function () {
	                      _this.scheduleNavigation(rawUrlTree, false, { skipLocationChange: change['pop'], replaceUrl: true });
	                  }, 0);
	              })));
	          }
	      };
	      Object.defineProperty(Router.prototype, "routerState", {
	          /**
	           *  Returns the current route state.
	           * @return {?}
	           */
	          get: function () { return this.currentRouterState; },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(Router.prototype, "url", {
	          /**
	           *  Returns the current url.
	           * @return {?}
	           */
	          get: function () { return this.serializeUrl(this.currentUrlTree); },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(Router.prototype, "events", {
	          /**
	           *  Returns an observable of route events
	           * @return {?}
	           */
	          get: function () { return this.routerEvents; },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       *  Resets the configuration used for navigation and generating links.
	        * *
	        * ### Usage
	        * *
	        * ```
	        * router.resetConfig([
	        * { path: 'team/:id', component: TeamCmp, children: [
	        * { path: 'simple', component: SimpleCmp },
	        * { path: 'user/:name', component: UserCmp }
	        * ] }
	        * ]);
	        * ```
	       * @param {?} config
	       * @return {?}
	       */
	      Router.prototype.resetConfig = function (config) {
	          validateConfig(config);
	          this.config = config;
	      };
	      /**
	       * @return {?}
	       */
	      Router.prototype.ngOnDestroy = function () { this.dispose(); };
	      /**
	       *  Disposes of the router.
	       * @return {?}
	       */
	      Router.prototype.dispose = function () {
	          if (this.locationSubscription) {
	              this.locationSubscription.unsubscribe();
	              this.locationSubscription = null;
	          }
	      };
	      /**
	       *  Applies an array of commands to the current url tree and creates a new url tree.
	        * *
	        * When given an activate route, applies the given commands starting from the route.
	        * When not given a route, applies the given command starting from the root.
	        * *
	        * ### Usage
	        * *
	        * ```
	        * // create /team/33/user/11
	        * router.createUrlTree(['/team', 33, 'user', 11]);
	        * *
	        * // create /team/33;expand=true/user/11
	        * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
	        * *
	        * // you can collapse static segments like this (this works only with the first passed-in value):
	        * router.createUrlTree(['/team/33/user', userId]);
	        * *
	        * // If the first segment can contain slashes, and you do not want the router to split it, you
	        * // can do the following:
	        * *
	        * router.createUrlTree([{segmentPath: '/one/two'}]);
	        * *
	        * // create /team/33/(user/11//right:chat)
	        * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
	        * *
	        * // remove the right secondary node
	        * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
	        * *
	        * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
	        * *
	        * // navigate to /team/33/user/11/details
	        * router.createUrlTree(['details'], {relativeTo: route});
	        * *
	        * // navigate to /team/33/user/22
	        * router.createUrlTree(['../22'], {relativeTo: route});
	        * *
	        * // navigate to /team/44/user/22
	        * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
	        * ```
	       * @param {?} commands
	       * @param {?=} __1
	       * @return {?}
	       */
	      Router.prototype.createUrlTree = function (commands, _a) {
	          var _b = _a === void 0 ? {} : _a, relativeTo = _b.relativeTo, queryParams = _b.queryParams, fragment = _b.fragment, preserveQueryParams = _b.preserveQueryParams, preserveFragment = _b.preserveFragment;
	          var /** @type {?} */ a = relativeTo ? relativeTo : this.routerState.root;
	          var /** @type {?} */ q = preserveQueryParams ? this.currentUrlTree.queryParams : queryParams;
	          var /** @type {?} */ f = preserveFragment ? this.currentUrlTree.fragment : fragment;
	          return createUrlTree(a, this.currentUrlTree, commands, q, f);
	      };
	      /**
	       *  Navigate based on the provided url. This navigation is always absolute.
	        * *
	        * Returns a promise that:
	        * - is resolved with 'true' when navigation succeeds
	        * - is resolved with 'false' when navigation fails
	        * - is rejected when an error happens
	        * *
	        * ### Usage
	        * *
	        * ```
	        * router.navigateByUrl("/team/33/user/11");
	        * *
	        * // Navigate without updating the URL
	        * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
	        * ```
	        * *
	        * In opposite to `navigate`, `navigateByUrl` takes a whole URL
	        * and does not apply any delta to the current one.
	       * @param {?} url
	       * @param {?=} extras
	       * @return {?}
	       */
	      Router.prototype.navigateByUrl = function (url, extras) {
	          if (extras === void 0) { extras = { skipLocationChange: false }; }
	          if (url instanceof UrlTree) {
	              return this.scheduleNavigation(this.urlHandlingStrategy.merge(url, this.rawUrlTree), true, extras);
	          }
	          else {
	              var /** @type {?} */ urlTree = this.urlSerializer.parse(url);
	              return this.scheduleNavigation(this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree), true, extras);
	          }
	      };
	      /**
	       *  Navigate based on the provided array of commands and a starting point.
	        * If no starting route is provided, the navigation is absolute.
	        * *
	        * Returns a promise that:
	        * - is resolved with 'true' when navigation succeeds
	        * - is resolved with 'false' when navigation fails
	        * - is rejected when an error happens
	        * *
	        * ### Usage
	        * *
	        * ```
	        * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
	        * *
	        * // Navigate without updating the URL
	        * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true });
	        * ```
	        * *
	        * In opposite to `navigateByUrl`, `navigate` always takes a delta
	        * that is applied to the current URL.
	       * @param {?} commands
	       * @param {?=} extras
	       * @return {?}
	       */
	      Router.prototype.navigate = function (commands, extras) {
	          if (extras === void 0) { extras = { skipLocationChange: false }; }
	          if (typeof extras.queryParams === 'object' && extras.queryParams !== null) {
	              extras.queryParams = this.removeEmptyProps(extras.queryParams);
	          }
	          return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
	      };
	      /**
	       *  Serializes a {@link UrlTree} into a string.
	       * @param {?} url
	       * @return {?}
	       */
	      Router.prototype.serializeUrl = function (url) { return this.urlSerializer.serialize(url); };
	      /**
	       *  Parses a string into a {@link UrlTree}.
	       * @param {?} url
	       * @return {?}
	       */
	      Router.prototype.parseUrl = function (url) { return this.urlSerializer.parse(url); };
	      /**
	       *  Returns if the url is activated or not.
	       * @param {?} url
	       * @param {?} exact
	       * @return {?}
	       */
	      Router.prototype.isActive = function (url, exact) {
	          if (url instanceof UrlTree) {
	              return containsTree(this.currentUrlTree, url, exact);
	          }
	          else {
	              var /** @type {?} */ urlTree = this.urlSerializer.parse(url);
	              return containsTree(this.currentUrlTree, urlTree, exact);
	          }
	      };
	      /**
	       * @param {?} params
	       * @return {?}
	       */
	      Router.prototype.removeEmptyProps = function (params) {
	          return Object.keys(params).reduce(function (result, key) {
	              var /** @type {?} */ value = params[key];
	              if (value !== null && value !== undefined) {
	                  result[key] = value;
	              }
	              return result;
	          }, {});
	      };
	      /**
	       * @return {?}
	       */
	      Router.prototype.processNavigations = function () {
	          var _this = this;
	          rxjs_operator_concatMap.concatMap
	              .call(this.navigations, function (nav) {
	              if (nav) {
	                  _this.executeScheduledNavigation(nav);
	                  // a failed navigation should not stop the router from processing
	                  // further navigations => the catch
	                  return nav.promise.catch(function () { });
	              }
	              else {
	                  return (rxjs_observable_of.of(null));
	              }
	          })
	              .subscribe(function () { });
	      };
	      /**
	       * @param {?} rawUrl
	       * @param {?} imperative
	       * @param {?} extras
	       * @return {?}
	       */
	      Router.prototype.scheduleNavigation = function (rawUrl, imperative, extras) {
	          var /** @type {?} */ resolve = null;
	          var /** @type {?} */ reject = null;
	          var /** @type {?} */ promise = new Promise(function (res, rej) {
	              resolve = res;
	              reject = rej;
	          });
	          var /** @type {?} */ id = ++this.navigationId;
	          this.navigations.next({ id: id, imperative: imperative, rawUrl: rawUrl, extras: extras, resolve: resolve, reject: reject, promise: promise });
	          // Make sure that the error is propagated even though `processNavigations` catch
	          // handler does not rethrow
	          return promise.catch(function (e) { return Promise.reject(e); });
	      };
	      /**
	       * @param {?} __0
	       * @return {?}
	       */
	      Router.prototype.executeScheduledNavigation = function (_a) {
	          var _this = this;
	          var id = _a.id, rawUrl = _a.rawUrl, extras = _a.extras, resolve = _a.resolve, reject = _a.reject;
	          var /** @type {?} */ url = this.urlHandlingStrategy.extract(rawUrl);
	          var /** @type {?} */ urlTransition = !this.navigated || url.toString() !== this.currentUrlTree.toString();
	          if (urlTransition && this.urlHandlingStrategy.shouldProcessUrl(rawUrl)) {
	              this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
	              Promise.resolve()
	                  .then(function (_) { return _this.runNavigate(url, rawUrl, extras.skipLocationChange, extras.replaceUrl, id, null); })
	                  .then(resolve, reject);
	          }
	          else if (urlTransition && this.rawUrlTree &&
	              this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
	              this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
	              Promise.resolve()
	                  .then(function (_) { return _this.runNavigate(url, rawUrl, false, false, id, createEmptyState(url, _this.rootComponentType).snapshot); })
	                  .then(resolve, reject);
	          }
	          else {
	              this.rawUrlTree = rawUrl;
	              resolve(null);
	          }
	      };
	      /**
	       * @param {?} url
	       * @param {?} rawUrl
	       * @param {?} shouldPreventPushState
	       * @param {?} shouldReplaceUrl
	       * @param {?} id
	       * @param {?} precreatedState
	       * @return {?}
	       */
	      Router.prototype.runNavigate = function (url, rawUrl, shouldPreventPushState, shouldReplaceUrl, id, precreatedState) {
	          var _this = this;
	          if (id !== this.navigationId) {
	              this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
	              this.routerEvents.next(new NavigationCancel(id, this.serializeUrl(url), "Navigation ID " + id + " is not equal to the current navigation id " + this.navigationId));
	              return Promise.resolve(false);
	          }
	          return new Promise(function (resolvePromise, rejectPromise) {
	              // create an observable of the url and route state snapshot
	              // this operation do not result in any side effects
	              var /** @type {?} */ urlAndSnapshot$;
	              if (!precreatedState) {
	                  var /** @type {?} */ redirectsApplied$ = applyRedirects(_this.injector, _this.configLoader, _this.urlSerializer, url, _this.config);
	                  urlAndSnapshot$ = rxjs_operator_mergeMap.mergeMap.call(redirectsApplied$, function (appliedUrl) {
	                      return rxjs_operator_map.map.call(recognize(_this.rootComponentType, _this.config, appliedUrl, _this.serializeUrl(appliedUrl)), function (snapshot) {
	                          _this.routerEvents.next(new RoutesRecognized(id, _this.serializeUrl(url), _this.serializeUrl(appliedUrl), snapshot));
	                          return { appliedUrl: appliedUrl, snapshot: snapshot };
	                      });
	                  });
	              }
	              else {
	                  urlAndSnapshot$ = rxjs_observable_of.of({ appliedUrl: url, snapshot: precreatedState });
	              }
	              // run preactivation: guards and data resolvers
	              var /** @type {?} */ preActivation;
	              var /** @type {?} */ preactivationTraverse$ = rxjs_operator_map.map.call(urlAndSnapshot$, function (_a) {
	                  var appliedUrl = _a.appliedUrl, snapshot = _a.snapshot;
	                  preActivation =
	                      new PreActivation(snapshot, _this.currentRouterState.snapshot, _this.injector);
	                  preActivation.traverse(_this.outletMap);
	                  return { appliedUrl: appliedUrl, snapshot: snapshot };
	              });
	              var /** @type {?} */ preactivationCheckGuards = rxjs_operator_mergeMap.mergeMap.call(preactivationTraverse$, function (_a) {
	                  var appliedUrl = _a.appliedUrl, snapshot = _a.snapshot;
	                  if (_this.navigationId !== id)
	                      return rxjs_observable_of.of(false);
	                  return rxjs_operator_map.map.call(preActivation.checkGuards(), function (shouldActivate) {
	                      return { appliedUrl: appliedUrl, snapshot: snapshot, shouldActivate: shouldActivate };
	                  });
	              });
	              var /** @type {?} */ preactivationResolveData$ = rxjs_operator_mergeMap.mergeMap.call(preactivationCheckGuards, function (p) {
	                  if (_this.navigationId !== id)
	                      return rxjs_observable_of.of(false);
	                  if (p.shouldActivate) {
	                      return rxjs_operator_map.map.call(preActivation.resolveData(), function () { return p; });
	                  }
	                  else {
	                      return rxjs_observable_of.of(p);
	                  }
	              });
	              // create router state
	              // this operation has side effects => route state is being affected
	              var /** @type {?} */ routerState$ = rxjs_operator_map.map.call(preactivationResolveData$, function (_a) {
	                  var appliedUrl = _a.appliedUrl, snapshot = _a.snapshot, shouldActivate = _a.shouldActivate;
	                  if (shouldActivate) {
	                      var /** @type {?} */ state = createRouterState(_this.routeReuseStrategy, snapshot, _this.currentRouterState);
	                      return { appliedUrl: appliedUrl, state: state, shouldActivate: shouldActivate };
	                  }
	                  else {
	                      return { appliedUrl: appliedUrl, state: null, shouldActivate: shouldActivate };
	                  }
	              });
	              // applied the new router state
	              // this operation has side effects
	              var /** @type {?} */ navigationIsSuccessful;
	              var /** @type {?} */ storedState = _this.currentRouterState;
	              var /** @type {?} */ storedUrl = _this.currentUrlTree;
	              routerState$
	                  .forEach(function (_a) {
	                  var appliedUrl = _a.appliedUrl, state = _a.state, shouldActivate = _a.shouldActivate;
	                  if (!shouldActivate || id !== _this.navigationId) {
	                      navigationIsSuccessful = false;
	                      return;
	                  }
	                  _this.currentUrlTree = appliedUrl;
	                  _this.rawUrlTree = _this.urlHandlingStrategy.merge(_this.currentUrlTree, rawUrl);
	                  _this.currentRouterState = state;
	                  if (!shouldPreventPushState) {
	                      var /** @type {?} */ path = _this.urlSerializer.serialize(_this.rawUrlTree);
	                      if (_this.location.isCurrentPathEqualTo(path) || shouldReplaceUrl) {
	                          _this.location.replaceState(path);
	                      }
	                      else {
	                          _this.location.go(path);
	                      }
	                  }
	                  new ActivateRoutes(_this.routeReuseStrategy, state, storedState)
	                      .activate(_this.outletMap);
	                  navigationIsSuccessful = true;
	              })
	                  .then(function () {
	                  _this.navigated = true;
	                  if (navigationIsSuccessful) {
	                      _this.routerEvents.next(new NavigationEnd(id, _this.serializeUrl(url), _this.serializeUrl(_this.currentUrlTree)));
	                      resolvePromise(true);
	                  }
	                  else {
	                      _this.resetUrlToCurrentUrlTree();
	                      _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url), ''));
	                      resolvePromise(false);
	                  }
	              }, function (e) {
	                  if (e instanceof NavigationCancelingError) {
	                      _this.resetUrlToCurrentUrlTree();
	                      _this.navigated = true;
	                      _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url), e.message));
	                      resolvePromise(false);
	                  }
	                  else {
	                      _this.routerEvents.next(new NavigationError(id, _this.serializeUrl(url), e));
	                      try {
	                          resolvePromise(_this.errorHandler(e));
	                      }
	                      catch (ee) {
	                          rejectPromise(ee);
	                      }
	                  }
	                  _this.currentRouterState = storedState;
	                  _this.currentUrlTree = storedUrl;
	                  _this.rawUrlTree = _this.urlHandlingStrategy.merge(_this.currentUrlTree, rawUrl);
	                  _this.location.replaceState(_this.serializeUrl(_this.rawUrlTree));
	              });
	          });
	      };
	      /**
	       * @return {?}
	       */
	      Router.prototype.resetUrlToCurrentUrlTree = function () {
	          var /** @type {?} */ path = this.urlSerializer.serialize(this.rawUrlTree);
	          this.location.replaceState(path);
	      };
	      return Router;
	  }());
	  var CanActivate = (function () {
	      /**
	       * @param {?} path
	       */
	      function CanActivate(path) {
	          this.path = path;
	      }
	      Object.defineProperty(CanActivate.prototype, "route", {
	          /**
	           * @return {?}
	           */
	          get: function () { return this.path[this.path.length - 1]; },
	          enumerable: true,
	          configurable: true
	      });
	      return CanActivate;
	  }());
	  var CanDeactivate = (function () {
	      /**
	       * @param {?} component
	       * @param {?} route
	       */
	      function CanDeactivate(component, route) {
	          this.component = component;
	          this.route = route;
	      }
	      return CanDeactivate;
	  }());
	  var PreActivation = (function () {
	      /**
	       * @param {?} future
	       * @param {?} curr
	       * @param {?} injector
	       */
	      function PreActivation(future, curr, injector) {
	          this.future = future;
	          this.curr = curr;
	          this.injector = injector;
	          this.checks = [];
	      }
	      /**
	       * @param {?} parentOutletMap
	       * @return {?}
	       */
	      PreActivation.prototype.traverse = function (parentOutletMap) {
	          var /** @type {?} */ futureRoot = this.future._root;
	          var /** @type {?} */ currRoot = this.curr ? this.curr._root : null;
	          this.traverseChildRoutes(futureRoot, currRoot, parentOutletMap, [futureRoot.value]);
	      };
	      /**
	       * @return {?}
	       */
	      PreActivation.prototype.checkGuards = function () {
	          var _this = this;
	          if (this.checks.length === 0)
	              return rxjs_observable_of.of(true);
	          var /** @type {?} */ checks$ = rxjs_observable_from.from(this.checks);
	          var /** @type {?} */ runningChecks$ = rxjs_operator_mergeMap.mergeMap.call(checks$, function (s) {
	              if (s instanceof CanActivate) {
	                  return andObservables(rxjs_observable_from.from([_this.runCanActivateChild(s.path), _this.runCanActivate(s.route)]));
	              }
	              else if (s instanceof CanDeactivate) {
	                  // workaround https://github.com/Microsoft/TypeScript/issues/7271
	                  var /** @type {?} */ s2 = (s);
	                  return _this.runCanDeactivate(s2.component, s2.route);
	              }
	              else {
	                  throw new Error('Cannot be reached');
	              }
	          });
	          return rxjs_operator_every.every.call(runningChecks$, function (result) { return result === true; });
	      };
	      /**
	       * @return {?}
	       */
	      PreActivation.prototype.resolveData = function () {
	          var _this = this;
	          if (this.checks.length === 0)
	              return rxjs_observable_of.of(null);
	          var /** @type {?} */ checks$ = rxjs_observable_from.from(this.checks);
	          var /** @type {?} */ runningChecks$ = rxjs_operator_concatMap.concatMap.call(checks$, function (s) {
	              if (s instanceof CanActivate) {
	                  return _this.runResolve(s.route);
	              }
	              else {
	                  return rxjs_observable_of.of(null);
	              }
	          });
	          return rxjs_operator_reduce.reduce.call(runningChecks$, function (_, __) { return _; });
	      };
	      /**
	       * @param {?} futureNode
	       * @param {?} currNode
	       * @param {?} outletMap
	       * @param {?} futurePath
	       * @return {?}
	       */
	      PreActivation.prototype.traverseChildRoutes = function (futureNode, currNode, outletMap, futurePath) {
	          var _this = this;
	          var /** @type {?} */ prevChildren = nodeChildrenAsMap(currNode);
	          futureNode.children.forEach(function (c) {
	              _this.traverseRoutes(c, prevChildren[c.value.outlet], outletMap, futurePath.concat([c.value]));
	              delete prevChildren[c.value.outlet];
	          });
	          forEach(prevChildren, function (v, k) { return _this.deactiveRouteAndItsChildren(v, outletMap._outlets[k]); });
	      };
	      /**
	       * @param {?} futureNode
	       * @param {?} currNode
	       * @param {?} parentOutletMap
	       * @param {?} futurePath
	       * @return {?}
	       */
	      PreActivation.prototype.traverseRoutes = function (futureNode, currNode, parentOutletMap, futurePath) {
	          var /** @type {?} */ future = futureNode.value;
	          var /** @type {?} */ curr = currNode ? currNode.value : null;
	          var /** @type {?} */ outlet = parentOutletMap ? parentOutletMap._outlets[futureNode.value.outlet] : null;
	          // reusing the node
	          if (curr && future._routeConfig === curr._routeConfig) {
	              if (!equalParamsAndUrlSegments(future, curr)) {
	                  this.checks.push(new CanDeactivate(outlet.component, curr), new CanActivate(futurePath));
	              }
	              else {
	                  // we need to set the data
	                  future.data = curr.data;
	                  future._resolvedData = curr._resolvedData;
	              }
	              // If we have a component, we need to go through an outlet.
	              if (future.component) {
	                  this.traverseChildRoutes(futureNode, currNode, outlet ? outlet.outletMap : null, futurePath);
	              }
	              else {
	                  this.traverseChildRoutes(futureNode, currNode, parentOutletMap, futurePath);
	              }
	          }
	          else {
	              if (curr) {
	                  this.deactiveRouteAndItsChildren(currNode, outlet);
	              }
	              this.checks.push(new CanActivate(futurePath));
	              // If we have a component, we need to go through an outlet.
	              if (future.component) {
	                  this.traverseChildRoutes(futureNode, null, outlet ? outlet.outletMap : null, futurePath);
	              }
	              else {
	                  this.traverseChildRoutes(futureNode, null, parentOutletMap, futurePath);
	              }
	          }
	      };
	      /**
	       * @param {?} route
	       * @param {?} outlet
	       * @return {?}
	       */
	      PreActivation.prototype.deactiveRouteAndItsChildren = function (route, outlet) {
	          var _this = this;
	          var /** @type {?} */ prevChildren = nodeChildrenAsMap(route);
	          var /** @type {?} */ r = route.value;
	          forEach(prevChildren, function (v, k) {
	              if (!r.component) {
	                  _this.deactiveRouteAndItsChildren(v, outlet);
	              }
	              else if (!!outlet) {
	                  _this.deactiveRouteAndItsChildren(v, outlet.outletMap._outlets[k]);
	              }
	              else {
	                  _this.deactiveRouteAndItsChildren(v, null);
	              }
	          });
	          if (!r.component) {
	              this.checks.push(new CanDeactivate(null, r));
	          }
	          else if (outlet && outlet.isActivated) {
	              this.checks.push(new CanDeactivate(outlet.component, r));
	          }
	          else {
	              this.checks.push(new CanDeactivate(null, r));
	          }
	      };
	      /**
	       * @param {?} future
	       * @return {?}
	       */
	      PreActivation.prototype.runCanActivate = function (future) {
	          var _this = this;
	          var /** @type {?} */ canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
	          if (!canActivate || canActivate.length === 0)
	              return rxjs_observable_of.of(true);
	          var /** @type {?} */ obs = rxjs_operator_map.map.call(rxjs_observable_from.from(canActivate), function (c) {
	              var /** @type {?} */ guard = _this.getToken(c, future);
	              var /** @type {?} */ observable;
	              if (guard.canActivate) {
	                  observable = wrapIntoObservable(guard.canActivate(future, _this.future));
	              }
	              else {
	                  observable = wrapIntoObservable(guard(future, _this.future));
	              }
	              return rxjs_operator_first.first.call(observable);
	          });
	          return andObservables(obs);
	      };
	      /**
	       * @param {?} path
	       * @return {?}
	       */
	      PreActivation.prototype.runCanActivateChild = function (path) {
	          var _this = this;
	          var /** @type {?} */ future = path[path.length - 1];
	          var /** @type {?} */ canActivateChildGuards = path.slice(0, path.length - 1)
	              .reverse()
	              .map(function (p) { return _this.extractCanActivateChild(p); })
	              .filter(function (_) { return _ !== null; });
	          return andObservables(rxjs_operator_map.map.call(rxjs_observable_from.from(canActivateChildGuards), function (d) {
	              var /** @type {?} */ obs = rxjs_operator_map.map.call(rxjs_observable_from.from(d.guards), function (c) {
	                  var /** @type {?} */ guard = _this.getToken(c, c.node);
	                  var /** @type {?} */ observable;
	                  if (guard.canActivateChild) {
	                      observable = wrapIntoObservable(guard.canActivateChild(future, _this.future));
	                  }
	                  else {
	                      observable = wrapIntoObservable(guard(future, _this.future));
	                  }
	                  return rxjs_operator_first.first.call(observable);
	              });
	              return andObservables(obs);
	          }));
	      };
	      /**
	       * @param {?} p
	       * @return {?}
	       */
	      PreActivation.prototype.extractCanActivateChild = function (p) {
	          var /** @type {?} */ canActivateChild = p._routeConfig ? p._routeConfig.canActivateChild : null;
	          if (!canActivateChild || canActivateChild.length === 0)
	              return null;
	          return { node: p, guards: canActivateChild };
	      };
	      /**
	       * @param {?} component
	       * @param {?} curr
	       * @return {?}
	       */
	      PreActivation.prototype.runCanDeactivate = function (component, curr) {
	          var _this = this;
	          var /** @type {?} */ canDeactivate = curr && curr._routeConfig ? curr._routeConfig.canDeactivate : null;
	          if (!canDeactivate || canDeactivate.length === 0)
	              return rxjs_observable_of.of(true);
	          var /** @type {?} */ canDeactivate$ = rxjs_operator_mergeMap.mergeMap.call(rxjs_observable_from.from(canDeactivate), function (c) {
	              var /** @type {?} */ guard = _this.getToken(c, curr);
	              var /** @type {?} */ observable;
	              if (guard.canDeactivate) {
	                  observable = wrapIntoObservable(guard.canDeactivate(component, curr, _this.curr));
	              }
	              else {
	                  observable = wrapIntoObservable(guard(component, curr, _this.curr));
	              }
	              return rxjs_operator_first.first.call(observable);
	          });
	          return rxjs_operator_every.every.call(canDeactivate$, function (result) { return result === true; });
	      };
	      /**
	       * @param {?} future
	       * @return {?}
	       */
	      PreActivation.prototype.runResolve = function (future) {
	          var /** @type {?} */ resolve = future._resolve;
	          return rxjs_operator_map.map.call(this.resolveNode(resolve, future), function (resolvedData) {
	              future._resolvedData = resolvedData;
	              future.data = merge(future.data, inheritedParamsDataResolve(future).resolve);
	              return null;
	          });
	      };
	      /**
	       * @param {?} resolve
	       * @param {?} future
	       * @return {?}
	       */
	      PreActivation.prototype.resolveNode = function (resolve, future) {
	          var _this = this;
	          return waitForMap(resolve, function (k, v) {
	              var /** @type {?} */ resolver = _this.getToken(v, future);
	              return resolver.resolve ? wrapIntoObservable(resolver.resolve(future, _this.future)) :
	                  wrapIntoObservable(resolver(future, _this.future));
	          });
	      };
	      /**
	       * @param {?} token
	       * @param {?} snapshot
	       * @return {?}
	       */
	      PreActivation.prototype.getToken = function (token, snapshot) {
	          var /** @type {?} */ config = closestLoadedConfig(snapshot);
	          var /** @type {?} */ injector = config ? config.injector : this.injector;
	          return injector.get(token);
	      };
	      return PreActivation;
	  }());
	  var ActivateRoutes = (function () {
	      /**
	       * @param {?} routeReuseStrategy
	       * @param {?} futureState
	       * @param {?} currState
	       */
	      function ActivateRoutes(routeReuseStrategy, futureState, currState) {
	          this.routeReuseStrategy = routeReuseStrategy;
	          this.futureState = futureState;
	          this.currState = currState;
	      }
	      /**
	       * @param {?} parentOutletMap
	       * @return {?}
	       */
	      ActivateRoutes.prototype.activate = function (parentOutletMap) {
	          var /** @type {?} */ futureRoot = this.futureState._root;
	          var /** @type {?} */ currRoot = this.currState ? this.currState._root : null;
	          this.deactivateChildRoutes(futureRoot, currRoot, parentOutletMap);
	          advanceActivatedRoute(this.futureState.root);
	          this.activateChildRoutes(futureRoot, currRoot, parentOutletMap);
	      };
	      /**
	       * @param {?} futureNode
	       * @param {?} currNode
	       * @param {?} outletMap
	       * @return {?}
	       */
	      ActivateRoutes.prototype.deactivateChildRoutes = function (futureNode, currNode, outletMap) {
	          var _this = this;
	          var /** @type {?} */ prevChildren = nodeChildrenAsMap(currNode);
	          futureNode.children.forEach(function (c) {
	              _this.deactivateRoutes(c, prevChildren[c.value.outlet], outletMap);
	              delete prevChildren[c.value.outlet];
	          });
	          forEach(prevChildren, function (v, k) { return _this.deactiveRouteAndItsChildren(v, outletMap); });
	      };
	      /**
	       * @param {?} futureNode
	       * @param {?} currNode
	       * @param {?} outletMap
	       * @return {?}
	       */
	      ActivateRoutes.prototype.activateChildRoutes = function (futureNode, currNode, outletMap) {
	          var _this = this;
	          var /** @type {?} */ prevChildren = nodeChildrenAsMap(currNode);
	          futureNode.children.forEach(function (c) { _this.activateRoutes(c, prevChildren[c.value.outlet], outletMap); });
	      };
	      /**
	       * @param {?} futureNode
	       * @param {?} currNode
	       * @param {?} parentOutletMap
	       * @return {?}
	       */
	      ActivateRoutes.prototype.deactivateRoutes = function (futureNode, currNode, parentOutletMap) {
	          var /** @type {?} */ future = futureNode.value;
	          var /** @type {?} */ curr = currNode ? currNode.value : null;
	          // reusing the node
	          if (future === curr) {
	              // If we have a normal route, we need to go through an outlet.
	              if (future.component) {
	                  var /** @type {?} */ outlet = getOutlet(parentOutletMap, future);
	                  this.deactivateChildRoutes(futureNode, currNode, outlet.outletMap);
	              }
	              else {
	                  this.deactivateChildRoutes(futureNode, currNode, parentOutletMap);
	              }
	          }
	          else {
	              if (curr) {
	                  this.deactiveRouteAndItsChildren(currNode, parentOutletMap);
	              }
	          }
	      };
	      /**
	       * @param {?} futureNode
	       * @param {?} currNode
	       * @param {?} parentOutletMap
	       * @return {?}
	       */
	      ActivateRoutes.prototype.activateRoutes = function (futureNode, currNode, parentOutletMap) {
	          var /** @type {?} */ future = futureNode.value;
	          var /** @type {?} */ curr = currNode ? currNode.value : null;
	          // reusing the node
	          if (future === curr) {
	              // advance the route to push the parameters
	              advanceActivatedRoute(future);
	              // If we have a normal route, we need to go through an outlet.
	              if (future.component) {
	                  var /** @type {?} */ outlet = getOutlet(parentOutletMap, future);
	                  this.activateChildRoutes(futureNode, currNode, outlet.outletMap);
	              }
	              else {
	                  this.activateChildRoutes(futureNode, currNode, parentOutletMap);
	              }
	          }
	          else {
	              // if we have a normal route, we need to advance the route
	              // and place the component into the outlet. After that recurse.
	              if (future.component) {
	                  advanceActivatedRoute(future);
	                  var /** @type {?} */ outlet = getOutlet(parentOutletMap, futureNode.value);
	                  if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
	                      var /** @type {?} */ stored = ((this.routeReuseStrategy.retrieve(future.snapshot)));
	                      this.routeReuseStrategy.store(future.snapshot, null);
	                      outlet.attach(stored.componentRef, stored.route.value);
	                      advanceActivatedRouteNodeAndItsChildren(stored.route);
	                  }
	                  else {
	                      var /** @type {?} */ outletMap = new RouterOutletMap();
	                      this.placeComponentIntoOutlet(outletMap, future, outlet);
	                      this.activateChildRoutes(futureNode, null, outletMap);
	                  }
	              }
	              else {
	                  advanceActivatedRoute(future);
	                  this.activateChildRoutes(futureNode, null, parentOutletMap);
	              }
	          }
	      };
	      /**
	       * @param {?} outletMap
	       * @param {?} future
	       * @param {?} outlet
	       * @return {?}
	       */
	      ActivateRoutes.prototype.placeComponentIntoOutlet = function (outletMap, future, outlet) {
	          var /** @type {?} */ resolved = ([{ provide: ActivatedRoute, useValue: future }, {
	                  provide: RouterOutletMap,
	                  useValue: outletMap
	              }]);
	          var /** @type {?} */ config = parentLoadedConfig(future.snapshot);
	          var /** @type {?} */ resolver = null;
	          var /** @type {?} */ injector = null;
	          if (config) {
	              injector = config.injectorFactory(outlet.locationInjector);
	              resolver = config.factoryResolver;
	              resolved.push({ provide: _angular_core.ComponentFactoryResolver, useValue: resolver });
	          }
	          else {
	              injector = outlet.locationInjector;
	              resolver = outlet.locationFactoryResolver;
	          }
	          outlet.activate(future, resolver, injector, _angular_core.ReflectiveInjector.resolve(resolved), outletMap);
	      };
	      /**
	       * @param {?} route
	       * @param {?} parentOutletMap
	       * @return {?}
	       */
	      ActivateRoutes.prototype.deactiveRouteAndItsChildren = function (route, parentOutletMap) {
	          if (this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
	              this.detachAndStoreRouteSubtree(route, parentOutletMap);
	          }
	          else {
	              this.deactiveRouteAndOutlet(route, parentOutletMap);
	          }
	      };
	      /**
	       * @param {?} route
	       * @param {?} parentOutletMap
	       * @return {?}
	       */
	      ActivateRoutes.prototype.detachAndStoreRouteSubtree = function (route, parentOutletMap) {
	          var /** @type {?} */ outlet = getOutlet(parentOutletMap, route.value);
	          var /** @type {?} */ componentRef = outlet.detach();
	          this.routeReuseStrategy.store(route.value.snapshot, { componentRef: componentRef, route: route });
	      };
	      /**
	       * @param {?} route
	       * @param {?} parentOutletMap
	       * @return {?}
	       */
	      ActivateRoutes.prototype.deactiveRouteAndOutlet = function (route, parentOutletMap) {
	          var _this = this;
	          var /** @type {?} */ prevChildren = nodeChildrenAsMap(route);
	          var /** @type {?} */ outlet = null;
	          // getOutlet throws when cannot find the right outlet,
	          // which can happen if an outlet was in an NgIf and was removed
	          try {
	              outlet = getOutlet(parentOutletMap, route.value);
	          }
	          catch (e) {
	              return;
	          }
	          var /** @type {?} */ childOutletMap = outlet.outletMap;
	          forEach(prevChildren, function (v, k) {
	              if (route.value.component) {
	                  _this.deactiveRouteAndItsChildren(v, childOutletMap);
	              }
	              else {
	                  _this.deactiveRouteAndItsChildren(v, parentOutletMap);
	              }
	          });
	          if (outlet && outlet.isActivated) {
	              outlet.deactivate();
	          }
	      };
	      return ActivateRoutes;
	  }());
	  /**
	   * @param {?} node
	   * @return {?}
	   */
	  function advanceActivatedRouteNodeAndItsChildren(node) {
	      advanceActivatedRoute(node.value);
	      node.children.forEach(advanceActivatedRouteNodeAndItsChildren);
	  }
	  /**
	   * @param {?} snapshot
	   * @return {?}
	   */
	  function parentLoadedConfig(snapshot) {
	      var /** @type {?} */ s = snapshot.parent;
	      while (s) {
	          var /** @type {?} */ c = s._routeConfig;
	          if (c && c._loadedConfig)
	              return c._loadedConfig;
	          if (c && c.component)
	              return null;
	          s = s.parent;
	      }
	      return null;
	  }
	  /**
	   * @param {?} snapshot
	   * @return {?}
	   */
	  function closestLoadedConfig(snapshot) {
	      if (!snapshot)
	          return null;
	      var /** @type {?} */ s = snapshot.parent;
	      while (s) {
	          var /** @type {?} */ c = s._routeConfig;
	          if (c && c._loadedConfig)
	              return c._loadedConfig;
	          s = s.parent;
	      }
	      return null;
	  }
	  /**
	   * @param {?} node
	   * @return {?}
	   */
	  function nodeChildrenAsMap(node) {
	      return node ? node.children.reduce(function (m, c) {
	          m[c.value.outlet] = c;
	          return m;
	      }, {}) : {};
	  }
	  /**
	   * @param {?} outletMap
	   * @param {?} route
	   * @return {?}
	   */
	  function getOutlet(outletMap, route) {
	      var /** @type {?} */ outlet = outletMap._outlets[route.outlet];
	      if (!outlet) {
	          var /** @type {?} */ componentName = ((route.component)).name;
	          if (route.outlet === PRIMARY_OUTLET) {
	              throw new Error("Cannot find primary outlet to load '" + componentName + "'");
	          }
	          else {
	              throw new Error("Cannot find the outlet " + route.outlet + " to load '" + componentName + "'");
	          }
	      }
	      return outlet;
	  }
	
	  /**
	   *  *
	    * *
	    * Consider the following route configuration:
	    * `[{ path: 'user/:name', component: UserCmp }]`
	    * *
	    * When linking to this `user/:name` route, you can write:
	    * `<a routerLink='/user/bob'>link to user component</a>`
	    * *
	    * *
	    * The RouterLink directives let you link to specific parts of your app.
	    * *
	    * When the link is static, you can use the directive as follows:
	    * `<a routerLink="/user/bob">link to user component</a>`
	    * *
	    * If you use dynamic values to generate the link, you can pass an array of path
	    * segments, followed by the params for each segment.
	    * *
	    * For instance `['/team', teamId, 'user', userName, {details: true}]`
	    * means that we want to generate a link to `/team/11/user/bob;details=true`.
	    * *
	    * Multiple static segments can be merged into one
	    * (e.g., `['/team/11/user', userName, {details: true}]`).
	    * *
	    * The first segment name can be prepended with `/`, `./`, or `../`:
	    * * If the first segment begins with `/`, the router will look up the route from the root of the
	    * app.
	    * * If the first segment begins with `./`, or doesn't begin with a slash, the router will
	    * instead look in the children of the current activated route.
	    * * And if the first segment begins with `../`, the router will go up one level.
	    * *
	    * You can set query params and fragment as follows:
	    * *
	    * ```
	    * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
	    * link to user component
	    * </a>
	    * ```
	    * RouterLink will use these to generate this link: `/user/bob#education?debug=true`.
	    * *
	    * You can also tell the directive to preserve the current query params and fragment:
	    * *
	    * ```
	    * <a [routerLink]="['/user/bob']" preserveQueryParams preserveFragment>
	    * link to user component
	    * </a>
	    * ```
	    * *
	    * The router link directive always treats the provided input as a delta to the current url.
	    * *
	    * For instance, if the current url is `/user/(box//aux:team)`.
	    * *
	    * Then the following link `<a [routerLink]="['/user/jim']">Jim</a>` will generate the link
	    * `/user/(jim//aux:team)`.
	    * *
	    * *
	    * See {@link Router.createUrlTree} for more information.
	    * *
	   */
	  var RouterLink = (function () {
	      /**
	       * @param {?} router
	       * @param {?} route
	       */
	      function RouterLink(router, route) {
	          this.router = router;
	          this.route = route;
	          this.commands = [];
	      }
	      Object.defineProperty(RouterLink.prototype, "routerLink", {
	          /**
	           * @param {?} data
	           * @return {?}
	           */
	          set: function (data) {
	              if (Array.isArray(data)) {
	                  this.commands = data;
	              }
	              else {
	                  this.commands = [data];
	              }
	          },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @return {?}
	       */
	      RouterLink.prototype.onClick = function () {
	          var /** @type {?} */ extras = {
	              skipLocationChange: attrBoolValue(this.skipLocationChange),
	              replaceUrl: attrBoolValue(this.replaceUrl),
	          };
	          this.router.navigateByUrl(this.urlTree, extras);
	          return true;
	      };
	      Object.defineProperty(RouterLink.prototype, "urlTree", {
	          /**
	           * @return {?}
	           */
	          get: function () {
	              return this.router.createUrlTree(this.commands, {
	                  relativeTo: this.route,
	                  queryParams: this.queryParams,
	                  fragment: this.fragment,
	                  preserveQueryParams: attrBoolValue(this.preserveQueryParams),
	                  preserveFragment: attrBoolValue(this.preserveFragment),
	              });
	          },
	          enumerable: true,
	          configurable: true
	      });
	      RouterLink.decorators = [
	          { type: _angular_core.Directive, args: [{ selector: ':not(a)[routerLink]' },] },
	      ];
	      /** @nocollapse */
	      RouterLink.ctorParameters = function () { return [
	          { type: Router, },
	          { type: ActivatedRoute, },
	      ]; };
	      RouterLink.propDecorators = {
	          'queryParams': [{ type: _angular_core.Input },],
	          'fragment': [{ type: _angular_core.Input },],
	          'preserveQueryParams': [{ type: _angular_core.Input },],
	          'preserveFragment': [{ type: _angular_core.Input },],
	          'skipLocationChange': [{ type: _angular_core.Input },],
	          'replaceUrl': [{ type: _angular_core.Input },],
	          'routerLink': [{ type: _angular_core.Input },],
	          'onClick': [{ type: _angular_core.HostListener, args: ['click', [],] },],
	      };
	      return RouterLink;
	  }());
	  /**
	   *  *
	    * See {@link RouterLink} for more information.
	    * *
	    * *
	   */
	  var RouterLinkWithHref = (function () {
	      /**
	       * @param {?} router
	       * @param {?} route
	       * @param {?} locationStrategy
	       */
	      function RouterLinkWithHref(router, route, locationStrategy) {
	          var _this = this;
	          this.router = router;
	          this.route = route;
	          this.locationStrategy = locationStrategy;
	          this.commands = [];
	          this.subscription = router.events.subscribe(function (s) {
	              if (s instanceof NavigationEnd) {
	                  _this.updateTargetUrlAndHref();
	              }
	          });
	      }
	      Object.defineProperty(RouterLinkWithHref.prototype, "routerLink", {
	          /**
	           * @param {?} data
	           * @return {?}
	           */
	          set: function (data) {
	              if (Array.isArray(data)) {
	                  this.commands = data;
	              }
	              else {
	                  this.commands = [data];
	              }
	          },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @param {?} changes
	       * @return {?}
	       */
	      RouterLinkWithHref.prototype.ngOnChanges = function (changes) { this.updateTargetUrlAndHref(); };
	      /**
	       * @return {?}
	       */
	      RouterLinkWithHref.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
	      /**
	       * @param {?} button
	       * @param {?} ctrlKey
	       * @param {?} metaKey
	       * @return {?}
	       */
	      RouterLinkWithHref.prototype.onClick = function (button, ctrlKey, metaKey) {
	          if (button !== 0 || ctrlKey || metaKey) {
	              return true;
	          }
	          if (typeof this.target === 'string' && this.target != '_self') {
	              return true;
	          }
	          var /** @type {?} */ extras = {
	              skipLocationChange: attrBoolValue(this.skipLocationChange),
	              replaceUrl: attrBoolValue(this.replaceUrl),
	          };
	          this.router.navigateByUrl(this.urlTree, extras);
	          return false;
	      };
	      /**
	       * @return {?}
	       */
	      RouterLinkWithHref.prototype.updateTargetUrlAndHref = function () {
	          this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
	      };
	      Object.defineProperty(RouterLinkWithHref.prototype, "urlTree", {
	          /**
	           * @return {?}
	           */
	          get: function () {
	              return this.router.createUrlTree(this.commands, {
	                  relativeTo: this.route,
	                  queryParams: this.queryParams,
	                  fragment: this.fragment,
	                  preserveQueryParams: attrBoolValue(this.preserveQueryParams),
	                  preserveFragment: attrBoolValue(this.preserveFragment),
	              });
	          },
	          enumerable: true,
	          configurable: true
	      });
	      RouterLinkWithHref.decorators = [
	          { type: _angular_core.Directive, args: [{ selector: 'a[routerLink]' },] },
	      ];
	      /** @nocollapse */
	      RouterLinkWithHref.ctorParameters = function () { return [
	          { type: Router, },
	          { type: ActivatedRoute, },
	          { type: _angular_common.LocationStrategy, },
	      ]; };
	      RouterLinkWithHref.propDecorators = {
	          'target': [{ type: _angular_core.Input },],
	          'queryParams': [{ type: _angular_core.Input },],
	          'fragment': [{ type: _angular_core.Input },],
	          'preserveQueryParams': [{ type: _angular_core.Input },],
	          'preserveFragment': [{ type: _angular_core.Input },],
	          'skipLocationChange': [{ type: _angular_core.Input },],
	          'replaceUrl': [{ type: _angular_core.Input },],
	          'href': [{ type: _angular_core.HostBinding },],
	          'routerLink': [{ type: _angular_core.Input },],
	          'onClick': [{ type: _angular_core.HostListener, args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey'],] },],
	      };
	      return RouterLinkWithHref;
	  }());
	  /**
	   * @param {?} s
	   * @return {?}
	   */
	  function attrBoolValue(s) {
	      return s === '' || !!s;
	  }
	
	  /**
	   *  *
	    * *
	    * ```
	    * <a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
	    * ```
	    * *
	    * *
	    * The RouterLinkActive directive lets you add a CSS class to an element when the link's route
	    * becomes active.
	    * *
	    * Consider the following example:
	    * *
	    * ```
	    * <a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
	    * ```
	    * *
	    * When the url is either '/user' or '/user/bob', the active-link class will
	    * be added to the `a` tag. If the url changes, the class will be removed.
	    * *
	    * You can set more than one class, as follows:
	    * *
	    * ```
	    * <a routerLink="/user/bob" routerLinkActive="class1 class2">Bob</a>
	    * <a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
	    * ```
	    * *
	    * You can configure RouterLinkActive by passing `exact: true`. This will add the classes
	    * only when the url matches the link exactly.
	    * *
	    * ```
	    * <a routerLink="/user/bob" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:
	    * true}">Bob</a>
	    * ```
	    * *
	    * You can assign the RouterLinkActive instance to a template variable and directly check
	    * the `isActive` status.
	    * ```
	    * <a routerLink="/user/bob" routerLinkActive #rla="routerLinkActive">
	    * Bob {{ rla.isActive ? '(already open)' : ''}}
	    * </a>
	    * ```
	    * *
	    * Finally, you can apply the RouterLinkActive directive to an ancestor of a RouterLink.
	    * *
	    * ```
	    * <div routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
	    * <a routerLink="/user/jim">Jim</a>
	    * <a routerLink="/user/bob">Bob</a>
	    * </div>
	    * ```
	    * *
	    * This will set the active-link class on the div tag if the url is either '/user/jim' or
	    * '/user/bob'.
	    * *
	    * *
	   */
	  var RouterLinkActive = (function () {
	      /**
	       * @param {?} router
	       * @param {?} element
	       * @param {?} renderer
	       */
	      function RouterLinkActive(router, element, renderer) {
	          var _this = this;
	          this.router = router;
	          this.element = element;
	          this.renderer = renderer;
	          this.classes = [];
	          this.routerLinkActiveOptions = { exact: false };
	          this.subscription = router.events.subscribe(function (s) {
	              if (s instanceof NavigationEnd) {
	                  _this.update();
	              }
	          });
	      }
	      Object.defineProperty(RouterLinkActive.prototype, "isActive", {
	          /**
	           * @return {?}
	           */
	          get: function () { return this.hasActiveLink(); },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @return {?}
	       */
	      RouterLinkActive.prototype.ngAfterContentInit = function () {
	          var _this = this;
	          this.links.changes.subscribe(function (s) { return _this.update(); });
	          this.linksWithHrefs.changes.subscribe(function (s) { return _this.update(); });
	          this.update();
	      };
	      Object.defineProperty(RouterLinkActive.prototype, "routerLinkActive", {
	          /**
	           * @param {?} data
	           * @return {?}
	           */
	          set: function (data) {
	              if (Array.isArray(data)) {
	                  this.classes = (data);
	              }
	              else {
	                  this.classes = data.split(' ');
	              }
	          },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @param {?} changes
	       * @return {?}
	       */
	      RouterLinkActive.prototype.ngOnChanges = function (changes) { this.update(); };
	      /**
	       * @return {?}
	       */
	      RouterLinkActive.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
	      /**
	       * @return {?}
	       */
	      RouterLinkActive.prototype.update = function () {
	          var _this = this;
	          if (!this.links || !this.linksWithHrefs || !this.router.navigated)
	              return;
	          var /** @type {?} */ isActive = this.hasActiveLink();
	          this.classes.forEach(function (c) {
	              if (c) {
	                  _this.renderer.setElementClass(_this.element.nativeElement, c, isActive);
	              }
	          });
	      };
	      /**
	       * @param {?} router
	       * @return {?}
	       */
	      RouterLinkActive.prototype.isLinkActive = function (router) {
	          var _this = this;
	          return function (link) {
	              return router.isActive(link.urlTree, _this.routerLinkActiveOptions.exact);
	          };
	      };
	      /**
	       * @return {?}
	       */
	      RouterLinkActive.prototype.hasActiveLink = function () {
	          return this.links.some(this.isLinkActive(this.router)) ||
	              this.linksWithHrefs.some(this.isLinkActive(this.router));
	      };
	      RouterLinkActive.decorators = [
	          { type: _angular_core.Directive, args: [{
	                      selector: '[routerLinkActive]',
	                      exportAs: 'routerLinkActive',
	                  },] },
	      ];
	      /** @nocollapse */
	      RouterLinkActive.ctorParameters = function () { return [
	          { type: Router, },
	          { type: _angular_core.ElementRef, },
	          { type: _angular_core.Renderer, },
	      ]; };
	      RouterLinkActive.propDecorators = {
	          'links': [{ type: _angular_core.ContentChildren, args: [RouterLink, { descendants: true },] },],
	          'linksWithHrefs': [{ type: _angular_core.ContentChildren, args: [RouterLinkWithHref, { descendants: true },] },],
	          'routerLinkActiveOptions': [{ type: _angular_core.Input },],
	          'routerLinkActive': [{ type: _angular_core.Input },],
	      };
	      return RouterLinkActive;
	  }());
	
	  /**
	   *  state.
	    * *
	    * *
	    * ```
	    * <router-outlet></router-outlet>
	    * <router-outlet name='left'></router-outlet>
	    * <router-outlet name='right'></router-outlet>
	    * ```
	    * *
	    * A router outlet will emit an activate event any time a new component is being instantiated,
	    * and a deactivate event when it is being destroyed.
	    * *
	    * ```
	    * <router-outlet
	    * (activate)='onActivate($event)'
	    * (deactivate)='onDeactivate($event)'></router-outlet>
	    * ```
	    * *
	   */
	  var RouterOutlet = (function () {
	      /**
	       * @param {?} parentOutletMap
	       * @param {?} location
	       * @param {?} resolver
	       * @param {?} name
	       */
	      function RouterOutlet(parentOutletMap, location, resolver, name) {
	          this.parentOutletMap = parentOutletMap;
	          this.location = location;
	          this.resolver = resolver;
	          this.name = name;
	          this.activateEvents = new _angular_core.EventEmitter();
	          this.deactivateEvents = new _angular_core.EventEmitter();
	          parentOutletMap.registerOutlet(name ? name : PRIMARY_OUTLET, this);
	      }
	      /**
	       * @return {?}
	       */
	      RouterOutlet.prototype.ngOnDestroy = function () { this.parentOutletMap.removeOutlet(this.name ? this.name : PRIMARY_OUTLET); };
	      Object.defineProperty(RouterOutlet.prototype, "locationInjector", {
	          /**
	           * @return {?}
	           */
	          get: function () { return this.location.injector; },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(RouterOutlet.prototype, "locationFactoryResolver", {
	          /**
	           * @return {?}
	           */
	          get: function () { return this.resolver; },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(RouterOutlet.prototype, "isActivated", {
	          /**
	           * @return {?}
	           */
	          get: function () { return !!this.activated; },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(RouterOutlet.prototype, "component", {
	          /**
	           * @return {?}
	           */
	          get: function () {
	              if (!this.activated)
	                  throw new Error('Outlet is not activated');
	              return this.activated.instance;
	          },
	          enumerable: true,
	          configurable: true
	      });
	      Object.defineProperty(RouterOutlet.prototype, "activatedRoute", {
	          /**
	           * @return {?}
	           */
	          get: function () {
	              if (!this.activated)
	                  throw new Error('Outlet is not activated');
	              return this._activatedRoute;
	          },
	          enumerable: true,
	          configurable: true
	      });
	      /**
	       * @return {?}
	       */
	      RouterOutlet.prototype.detach = function () {
	          if (!this.activated)
	              throw new Error('Outlet is not activated');
	          this.location.detach();
	          var /** @type {?} */ r = this.activated;
	          this.activated = null;
	          this._activatedRoute = null;
	          return r;
	      };
	      /**
	       * @param {?} ref
	       * @param {?} activatedRoute
	       * @return {?}
	       */
	      RouterOutlet.prototype.attach = function (ref, activatedRoute) {
	          this.activated = ref;
	          this._activatedRoute = activatedRoute;
	          this.location.insert(ref.hostView);
	      };
	      /**
	       * @return {?}
	       */
	      RouterOutlet.prototype.deactivate = function () {
	          if (this.activated) {
	              var /** @type {?} */ c = this.component;
	              this.activated.destroy();
	              this.activated = null;
	              this._activatedRoute = null;
	              this.deactivateEvents.emit(c);
	          }
	      };
	      /**
	       * @param {?} activatedRoute
	       * @param {?} resolver
	       * @param {?} injector
	       * @param {?} providers
	       * @param {?} outletMap
	       * @return {?}
	       */
	      RouterOutlet.prototype.activate = function (activatedRoute, resolver, injector, providers, outletMap) {
	          if (this.isActivated) {
	              throw new Error('Cannot activate an already activated outlet');
	          }
	          this.outletMap = outletMap;
	          this._activatedRoute = activatedRoute;
	          var /** @type {?} */ snapshot = activatedRoute._futureSnapshot;
	          var /** @type {?} */ component = (snapshot._routeConfig.component);
	          var /** @type {?} */ factory = resolver.resolveComponentFactory(component);
	          var /** @type {?} */ inj = _angular_core.ReflectiveInjector.fromResolvedProviders(providers, injector);
	          this.activated = this.location.createComponent(factory, this.location.length, inj, []);
	          this.activated.changeDetectorRef.detectChanges();
	          this.activateEvents.emit(this.activated.instance);
	      };
	      RouterOutlet.decorators = [
	          { type: _angular_core.Directive, args: [{ selector: 'router-outlet' },] },
	      ];
	      /** @nocollapse */
	      RouterOutlet.ctorParameters = function () { return [
	          { type: RouterOutletMap, },
	          { type: _angular_core.ViewContainerRef, },
	          { type: _angular_core.ComponentFactoryResolver, },
	          { type: undefined, decorators: [{ type: _angular_core.Attribute, args: ['name',] },] },
	      ]; };
	      RouterOutlet.propDecorators = {
	          'activateEvents': [{ type: _angular_core.Output, args: ['activate',] },],
	          'deactivateEvents': [{ type: _angular_core.Output, args: ['deactivate',] },],
	      };
	      return RouterOutlet;
	  }());
	
	  /**
	   * @license
	   * Copyright Google Inc. All Rights Reserved.
	   *
	   * Use of this source code is governed by an MIT-style license that can be
	   * found in the LICENSE file at https://angular.io/license
	   */
	  /**
	   *  *
	   * @abstract
	   */
	  var RouteReuseStrategy = (function () {
	      function RouteReuseStrategy() {
	      }
	      /**
	       *  Determines if this route (and its subtree) should be detached to be reused later.
	       * @abstract
	       * @param {?} route
	       * @return {?}
	       */
	      RouteReuseStrategy.prototype.shouldDetach = function (route) { };
	      /**
	       *  Stores the detached route.
	       * @abstract
	       * @param {?} route
	       * @param {?} handle
	       * @return {?}
	       */
	      RouteReuseStrategy.prototype.store = function (route, handle) { };
	      /**
	       *  Determines if this route (and its subtree) should be reattached.
	       * @abstract
	       * @param {?} route
	       * @return {?}
	       */
	      RouteReuseStrategy.prototype.shouldAttach = function (route) { };
	      /**
	       *  Retrieves the previously stored route.
	       * @abstract
	       * @param {?} route
	       * @return {?}
	       */
	      RouteReuseStrategy.prototype.retrieve = function (route) { };
	      /**
	       *  Determines if a route should be reused.
	       * @abstract
	       * @param {?} future
	       * @param {?} curr
	       * @return {?}
	       */
	      RouteReuseStrategy.prototype.shouldReuseRoute = function (future, curr) { };
	      return RouteReuseStrategy;
	  }());
	
	  var /** @type {?} */ getDOM = _angular_platformBrowser.__platform_browser_private__.getDOM;
	
	  /**
	   *  *
	   * @abstract
	   */
	  var PreloadingStrategy = (function () {
	      function PreloadingStrategy() {
	      }
	      /**
	       * @abstract
	       * @param {?} route
	       * @param {?} fn
	       * @return {?}
	       */
	      PreloadingStrategy.prototype.preload = function (route, fn) { };
	      return PreloadingStrategy;
	  }());
	  /**
	   *  *
	    * *
	    * ```
	    * RouteModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
	    * ```
	    * *
	   */
	  var PreloadAllModules = (function () {
	      function PreloadAllModules() {
	      }
	      /**
	       * @param {?} route
	       * @param {?} fn
	       * @return {?}
	       */
	      PreloadAllModules.prototype.preload = function (route, fn) {
	          return rxjs_operator_catch._catch.call(fn(), function () { return rxjs_observable_of.of(null); });
	      };
	      return PreloadAllModules;
	  }());
	  /**
	   *  *
	    * *
	    * This strategy is enabled by default.
	    * *
	   */
	  var NoPreloading = (function () {
	      function NoPreloading() {
	      }
	      /**
	       * @param {?} route
	       * @param {?} fn
	       * @return {?}
	       */
	      NoPreloading.prototype.preload = function (route, fn) { return rxjs_observable_of.of(null); };
	      return NoPreloading;
	  }());
	  /**
	   *  The preloader optimistically loads all router configurations to
	    * make navigations into lazily-loaded sections of the application faster.
	    * *
	    * The preloader runs in the background. When the router bootstraps, the preloader
	    * starts listening to all navigation events. After every such event, the preloader
	    * will check if any configurations can be loaded lazily.
	    * *
	    * If a route is protected by `canLoad` guards, the preloaded will not load it.
	    * *
	   */
	  var RouterPreloader = (function () {
	      /**
	       * @param {?} router
	       * @param {?} moduleLoader
	       * @param {?} compiler
	       * @param {?} injector
	       * @param {?} preloadingStrategy
	       */
	      function RouterPreloader(router, moduleLoader, compiler, injector, preloadingStrategy) {
	          this.router = router;
	          this.injector = injector;
	          this.preloadingStrategy = preloadingStrategy;
	          this.loader = new RouterConfigLoader(moduleLoader, compiler);
	      }
	      ;
	      /**
	       * @return {?}
	       */
	      RouterPreloader.prototype.setUpPreloading = function () {
	          var _this = this;
	          var /** @type {?} */ navigations = rxjs_operator_filter.filter.call(this.router.events, function (e) { return e instanceof NavigationEnd; });
	          this.subscription = rxjs_operator_concatMap.concatMap.call(navigations, function () { return _this.preload(); }).subscribe(function (v) { });
	      };
	      /**
	       * @return {?}
	       */
	      RouterPreloader.prototype.preload = function () { return this.processRoutes(this.injector, this.router.config); };
	      /**
	       * @return {?}
	       */
	      RouterPreloader.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
	      /**
	       * @param {?} injector
	       * @param {?} routes
	       * @return {?}
	       */
	      RouterPreloader.prototype.processRoutes = function (injector, routes) {
	          var /** @type {?} */ res = [];
	          for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
	              var c = routes_1[_i];
	              // we already have the config loaded, just recurce
	              if (c.loadChildren && !c.canLoad && ((c))._loadedConfig) {
	                  var /** @type {?} */ childConfig = ((c))._loadedConfig;
	                  res.push(this.processRoutes(childConfig.injector, childConfig.routes));
	              }
	              else if (c.loadChildren && !c.canLoad) {
	                  res.push(this.preloadConfig(injector, c));
	              }
	              else if (c.children) {
	                  res.push(this.processRoutes(injector, c.children));
	              }
	          }
	          return rxjs_operator_mergeAll.mergeAll.call(rxjs_observable_from.from(res));
	      };
	      /**
	       * @param {?} injector
	       * @param {?} route
	       * @return {?}
	       */
	      RouterPreloader.prototype.preloadConfig = function (injector, route) {
	          var _this = this;
	          return this.preloadingStrategy.preload(route, function () {
	              var /** @type {?} */ loaded = _this.loader.load(injector, route.loadChildren);
	              return rxjs_operator_mergeMap.mergeMap.call(loaded, function (config) {
	                  var /** @type {?} */ c = route;
	                  c._loadedConfig = config;
	                  return _this.processRoutes(config.injector, config.routes);
	              });
	          });
	      };
	      RouterPreloader.decorators = [
	          { type: _angular_core.Injectable },
	      ];
	      /** @nocollapse */
	      RouterPreloader.ctorParameters = function () { return [
	          { type: Router, },
	          { type: _angular_core.NgModuleFactoryLoader, },
	          { type: _angular_core.Compiler, },
	          { type: _angular_core.Injector, },
	          { type: PreloadingStrategy, },
	      ]; };
	      return RouterPreloader;
	  }());
	
	  /**
	   * @whatItDoes Contains a list of directives
	   * @stable
	   */
	  var /** @type {?} */ ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive];
	  /**
	   * @whatItDoes Is used in DI to configure the router.
	   * @stable
	   */
	  var /** @type {?} */ ROUTER_CONFIGURATION = new _angular_core.OpaqueToken('ROUTER_CONFIGURATION');
	  /**
	   * @docsNotRequired
	   */
	  var /** @type {?} */ ROUTER_FORROOT_GUARD = new _angular_core.OpaqueToken('ROUTER_FORROOT_GUARD');
	  var /** @type {?} */ ROUTER_PROVIDERS = [
	      _angular_common.Location,
	      { provide: UrlSerializer, useClass: DefaultUrlSerializer },
	      {
	          provide: Router,
	          useFactory: setupRouter,
	          deps: [
	              _angular_core.ApplicationRef, UrlSerializer, RouterOutletMap, _angular_common.Location, _angular_core.Injector, _angular_core.NgModuleFactoryLoader,
	              _angular_core.Compiler, ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new _angular_core.Optional()],
	              [RouteReuseStrategy, new _angular_core.Optional()]
	          ]
	      },
	      RouterOutletMap,
	      { provide: ActivatedRoute, useFactory: rootRoute, deps: [Router] },
	      { provide: _angular_core.NgModuleFactoryLoader, useClass: _angular_core.SystemJsNgModuleLoader },
	      RouterPreloader,
	      NoPreloading,
	      PreloadAllModules,
	      { provide: ROUTER_CONFIGURATION, useValue: { enableTracing: false } },
	  ];
	  /**
	   * @return {?}
	   */
	  function routerNgProbeToken() {
	      return new _angular_core.NgProbeToken('Router', Router);
	  }
	  /**
	   *  *
	    * *
	    * RouterModule can be imported multiple times: once per lazily-loaded bundle.
	    * Since the router deals with a global shared resource--location, we cannot have
	    * more than one router service active.
	    * *
	    * That is why there are two ways to create the module: `RouterModule.forRoot` and
	    * `RouterModule.forChild`.
	    * *
	    * * `forRoot` creates a module that contains all the directives, the given routes, and the router
	    * service itself.
	    * * `forChild` creates a module that contains all the directives and the given routes, but does not
	    * include the router service.
	    * *
	    * When registered at the root, the module should be used as follows
	    * *
	    * ```
	    * imports: [RouterModule.forRoot(ROUTES)]
	    * })
	    * class MyNgModule {}
	    * ```
	    * *
	    * For submodules and lazy loaded submodules the module should be used as follows:
	    * *
	    * ```
	    * imports: [RouterModule.forChild(ROUTES)]
	    * })
	    * class MyNgModule {}
	    * ```
	    * *
	    * *
	    * Managing state transitions is one of the hardest parts of building applications. This is
	    * especially true on the web, where you also need to ensure that the state is reflected in the URL.
	    * In addition, we often want to split applications into multiple bundles and load them on demand.
	    * Doing this transparently is not trivial.
	    * *
	    * The Angular 2 router solves these problems. Using the router, you can declaratively specify
	    * application states, manage state transitions while taking care of the URL, and load bundles on
	    * demand.
	    * *
	    * [Read this developer guide](https://angular.io/docs/ts/latest/guide/router.html) to get an
	    * overview of how the router should be used.
	    * *
	   */
	  var RouterModule = (function () {
	      /**
	       * @param {?} guard
	       */
	      function RouterModule(guard) {
	      }
	      /**
	       *  Creates a module with all the router providers and directives. It also optionally sets up an
	        * application listener to perform an initial navigation.
	        * *
	        * Options:
	        * * `enableTracing` makes the router log all its internal events to the console.
	        * * `useHash` enables the location strategy that uses the URL fragment instead of the history
	        * API.
	        * * `initialNavigation` disables the initial navigation.
	        * * `errorHandler` provides a custom error handler.
	       * @param {?} routes
	       * @param {?=} config
	       * @return {?}
	       */
	      RouterModule.forRoot = function (routes, config) {
	          return {
	              ngModule: RouterModule,
	              providers: [
	                  ROUTER_PROVIDERS,
	                  provideRoutes(routes),
	                  {
	                      provide: ROUTER_FORROOT_GUARD,
	                      useFactory: provideForRootGuard,
	                      deps: [[Router, new _angular_core.Optional(), new _angular_core.SkipSelf()]]
	                  },
	                  { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} },
	                  {
	                      provide: _angular_common.LocationStrategy,
	                      useFactory: provideLocationStrategy,
	                      deps: [
	                          _angular_common.PlatformLocation, [new _angular_core.Inject(_angular_common.APP_BASE_HREF), new _angular_core.Optional()], ROUTER_CONFIGURATION
	                      ]
	                  },
	                  {
	                      provide: PreloadingStrategy,
	                      useExisting: config && config.preloadingStrategy ? config.preloadingStrategy :
	                          NoPreloading
	                  },
	                  { provide: _angular_core.NgProbeToken, multi: true, useFactory: routerNgProbeToken },
	                  provideRouterInitializer(),
	              ],
	          };
	      };
	      /**
	       *  Creates a module with all the router directives and a provider registering routes.
	       * @param {?} routes
	       * @return {?}
	       */
	      RouterModule.forChild = function (routes) {
	          return { ngModule: RouterModule, providers: [provideRoutes(routes)] };
	      };
	      RouterModule.decorators = [
	          { type: _angular_core.NgModule, args: [{ declarations: ROUTER_DIRECTIVES, exports: ROUTER_DIRECTIVES },] },
	      ];
	      /** @nocollapse */
	      RouterModule.ctorParameters = function () { return [
	          { type: undefined, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [ROUTER_FORROOT_GUARD,] },] },
	      ]; };
	      return RouterModule;
	  }());
	  /**
	   * @param {?} platformLocationStrategy
	   * @param {?} baseHref
	   * @param {?=} options
	   * @return {?}
	   */
	  function provideLocationStrategy(platformLocationStrategy, baseHref, options) {
	      if (options === void 0) { options = {}; }
	      return options.useHash ? new _angular_common.HashLocationStrategy(platformLocationStrategy, baseHref) :
	          new _angular_common.PathLocationStrategy(platformLocationStrategy, baseHref);
	  }
	  /**
	   * @param {?} router
	   * @return {?}
	   */
	  function provideForRootGuard(router) {
	      if (router) {
	          throw new Error("RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
	      }
	      return 'guarded';
	  }
	  /**
	   *  *
	    * *
	    * ```
	    * imports: [RouterModule.forChild(ROUTES)],
	    * providers: [provideRoutes(EXTRA_ROUTES)]
	    * })
	    * class MyNgModule {}
	    * ```
	    * *
	   * @param {?} routes
	   * @return {?}
	   */
	  function provideRoutes(routes) {
	      return [
	          { provide: _angular_core.ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: routes },
	          { provide: ROUTES, multi: true, useValue: routes },
	      ];
	  }
	  /**
	   * @param {?} ref
	   * @param {?} urlSerializer
	   * @param {?} outletMap
	   * @param {?} location
	   * @param {?} injector
	   * @param {?} loader
	   * @param {?} compiler
	   * @param {?} config
	   * @param {?=} opts
	   * @param {?=} urlHandlingStrategy
	   * @param {?=} routeReuseStrategy
	   * @return {?}
	   */
	  function setupRouter(ref, urlSerializer, outletMap, location, injector, loader, compiler, config, opts, urlHandlingStrategy, routeReuseStrategy) {
	      if (opts === void 0) { opts = {}; }
	      var /** @type {?} */ router = new Router(null, urlSerializer, outletMap, location, injector, loader, compiler, flatten(config));
	      if (urlHandlingStrategy) {
	          router.urlHandlingStrategy = urlHandlingStrategy;
	      }
	      if (routeReuseStrategy) {
	          router.routeReuseStrategy = routeReuseStrategy;
	      }
	      if (opts.errorHandler) {
	          router.errorHandler = opts.errorHandler;
	      }
	      if (opts.enableTracing) {
	          var /** @type {?} */ dom_1 = getDOM();
	          router.events.subscribe(function (e) {
	              dom_1.logGroup("Router Event: " + ((e.constructor)).name);
	              dom_1.log(e.toString());
	              dom_1.log(e);
	              dom_1.logGroupEnd();
	          });
	      }
	      return router;
	  }
	  /**
	   * @param {?} router
	   * @return {?}
	   */
	  function rootRoute(router) {
	      return router.routerState.root;
	  }
	  /**
	   * @param {?} router
	   * @param {?} ref
	   * @param {?} preloader
	   * @param {?} opts
	   * @return {?}
	   */
	  function initialRouterNavigation(router, ref, preloader, opts) {
	      return function (bootstrappedComponentRef) {
	          if (bootstrappedComponentRef !== ref.components[0]) {
	              return;
	          }
	          router.resetRootComponentType(ref.componentTypes[0]);
	          preloader.setUpPreloading();
	          if (opts.initialNavigation === false) {
	              router.setUpLocationChangeListener();
	          }
	          else {
	              router.initialNavigation();
	          }
	      };
	  }
	  /**
	   * A token for the router initializer that will be called after the app is bootstrapped.
	   *
	   * @experimental
	   */
	  var /** @type {?} */ ROUTER_INITIALIZER = new _angular_core.OpaqueToken('Router Initializer');
	  /**
	   * @return {?}
	   */
	  function provideRouterInitializer() {
	      return [
	          {
	              provide: ROUTER_INITIALIZER,
	              useFactory: initialRouterNavigation,
	              deps: [Router, _angular_core.ApplicationRef, RouterPreloader, ROUTER_CONFIGURATION]
	          },
	          { provide: _angular_core.APP_BOOTSTRAP_LISTENER, multi: true, useExisting: ROUTER_INITIALIZER },
	      ];
	  }
	
	  /**
	   * @stable
	   */
	  var /** @type {?} */ VERSION = new _angular_core.Version('3.3.0');
	
	  var /** @type {?} */ __router_private__ = {
	      ROUTER_PROVIDERS: ROUTER_PROVIDERS,
	      ROUTES: ROUTES,
	      flatten: flatten
	  };
	
	  exports.RouterLink = RouterLink;
	  exports.RouterLinkWithHref = RouterLinkWithHref;
	  exports.RouterLinkActive = RouterLinkActive;
	  exports.RouterOutlet = RouterOutlet;
	  exports.RouteReuseStrategy = RouteReuseStrategy;
	  exports.NavigationCancel = NavigationCancel;
	  exports.NavigationEnd = NavigationEnd;
	  exports.NavigationError = NavigationError;
	  exports.NavigationStart = NavigationStart;
	  exports.Router = Router;
	  exports.RoutesRecognized = RoutesRecognized;
	  exports.ROUTER_CONFIGURATION = ROUTER_CONFIGURATION;
	  exports.ROUTER_INITIALIZER = ROUTER_INITIALIZER;
	  exports.RouterModule = RouterModule;
	  exports.provideRoutes = provideRoutes;
	  exports.RouterOutletMap = RouterOutletMap;
	  exports.NoPreloading = NoPreloading;
	  exports.PreloadAllModules = PreloadAllModules;
	  exports.PreloadingStrategy = PreloadingStrategy;
	  exports.RouterPreloader = RouterPreloader;
	  exports.ActivatedRoute = ActivatedRoute;
	  exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
	  exports.RouterState = RouterState;
	  exports.RouterStateSnapshot = RouterStateSnapshot;
	  exports.PRIMARY_OUTLET = PRIMARY_OUTLET;
	  exports.UrlHandlingStrategy = UrlHandlingStrategy;
	  exports.DefaultUrlSerializer = DefaultUrlSerializer;
	  exports.UrlSegment = UrlSegment;
	  exports.UrlSegmentGroup = UrlSegmentGroup;
	  exports.UrlSerializer = UrlSerializer;
	  exports.UrlTree = UrlTree;
	  exports.VERSION = VERSION;
	  exports.__router_private__ = __router_private__;
	
	}));

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(4);
	var ObjectUnsubscribedError_1 = __webpack_require__(19);
	/**
	 * @class BehaviorSubject<T>
	 */
	var BehaviorSubject = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.closed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasError) {
	            throw this.thrownError;
	        }
	        else if (this.closed) {
	            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
	        }
	        else {
	            return this._value;
	        }
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, this._value = value);
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject));
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FromObservable_1 = __webpack_require__(36);
	exports.from = FromObservable_1.FromObservable.create;
	//# sourceMappingURL=from.js.map

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isArray_1 = __webpack_require__(11);
	var isPromise_1 = __webpack_require__(37);
	var PromiseObservable_1 = __webpack_require__(27);
	var IteratorObservable_1 = __webpack_require__(38);
	var ArrayObservable_1 = __webpack_require__(40);
	var ArrayLikeObservable_1 = __webpack_require__(44);
	var iterator_1 = __webpack_require__(39);
	var Observable_1 = __webpack_require__(5);
	var observeOn_1 = __webpack_require__(45);
	var observable_1 = __webpack_require__(18);
	var isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromObservable = (function (_super) {
	    __extends(FromObservable, _super);
	    function FromObservable(ish, scheduler) {
	        _super.call(this, null);
	        this.ish = ish;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable from an Array, an array-like object, a Promise, an
	     * iterable object, or an Observable-like object.
	     *
	     * <span class="informal">Converts almost anything to an Observable.</span>
	     *
	     * <img src="./img/from.png" width="100%">
	     *
	     * Convert various other objects and data types into Observables. `from`
	     * converts a Promise or an array-like or an
	     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
	     * object into an Observable that emits the items in that promise or array or
	     * iterable. A String, in this context, is treated as an array of characters.
	     * Observable-like objects (contains a function named with the ES2015 Symbol
	     * for Observable) can also be converted through this operator.
	     *
	     * @example <caption>Converts an array to an Observable</caption>
	     * var array = [10, 20, 30];
	     * var result = Rx.Observable.from(array);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
	     * function* generateDoubles(seed) {
	     *   var i = seed;
	     *   while (true) {
	     *     yield i;
	     *     i = 2 * i; // double it
	     *   }
	     * }
	     *
	     * var iterator = generateDoubles(3);
	     * var result = Rx.Observable.from(iterator).take(10);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link fromEvent}
	     * @see {@link fromEventPattern}
	     * @see {@link fromPromise}
	     *
	     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
	     * Observable-like, an Array, an iterable or an array-like object to be
	     * converted.
	     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
	     * emissions of values.
	     * @return {Observable<T>} The Observable whose values are originally from the
	     * input object that was converted.
	     * @static true
	     * @name from
	     * @owner Observable
	     */
	    FromObservable.create = function (ish, scheduler) {
	        if (ish != null) {
	            if (typeof ish[observable_1.$$observable] === 'function') {
	                if (ish instanceof Observable_1.Observable && !scheduler) {
	                    return ish;
	                }
	                return new FromObservable(ish, scheduler);
	            }
	            else if (isArray_1.isArray(ish)) {
	                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
	            }
	            else if (isPromise_1.isPromise(ish)) {
	                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
	            }
	            else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
	                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
	            }
	            else if (isArrayLike(ish)) {
	                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
	            }
	        }
	        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
	    };
	    FromObservable.prototype._subscribe = function (subscriber) {
	        var ish = this.ish;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            return ish[observable_1.$$observable]().subscribe(subscriber);
	        }
	        else {
	            return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
	        }
	    };
	    return FromObservable;
	}(Observable_1.Observable));
	exports.FromObservable = FromObservable;
	//# sourceMappingURL=FromObservable.js.map

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	exports.isPromise = isPromise;
	//# sourceMappingURL=isPromise.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(6);
	var Observable_1 = __webpack_require__(5);
	var iterator_1 = __webpack_require__(39);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IteratorObservable = (function (_super) {
	    __extends(IteratorObservable, _super);
	    function IteratorObservable(iterator, scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	        if (iterator == null) {
	            throw new Error('iterator cannot be null.');
	        }
	        this.iterator = getIterator(iterator);
	    }
	    IteratorObservable.create = function (iterator, scheduler) {
	        return new IteratorObservable(iterator, scheduler);
	    };
	    IteratorObservable.dispatch = function (state) {
	        var index = state.index, hasError = state.hasError, iterator = state.iterator, subscriber = state.subscriber;
	        if (hasError) {
	            subscriber.error(state.error);
	            return;
	        }
	        var result = iterator.next();
	        if (result.done) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(result.value);
	        state.index = index + 1;
	        if (subscriber.closed) {
	            if (typeof iterator.return === 'function') {
	                iterator.return();
	            }
	            return;
	        }
	        this.schedule(state);
	    };
	    IteratorObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, iterator = _a.iterator, scheduler = _a.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(IteratorObservable.dispatch, 0, {
	                index: index, iterator: iterator, subscriber: subscriber
	            });
	        }
	        else {
	            do {
	                var result = iterator.next();
	                if (result.done) {
	                    subscriber.complete();
	                    break;
	                }
	                else {
	                    subscriber.next(result.value);
	                }
	                if (subscriber.closed) {
	                    if (typeof iterator.return === 'function') {
	                        iterator.return();
	                    }
	                    break;
	                }
	            } while (true);
	        }
	    };
	    return IteratorObservable;
	}(Observable_1.Observable));
	exports.IteratorObservable = IteratorObservable;
	var StringIterator = (function () {
	    function StringIterator(str, idx, len) {
	        if (idx === void 0) { idx = 0; }
	        if (len === void 0) { len = str.length; }
	        this.str = str;
	        this.idx = idx;
	        this.len = len;
	    }
	    StringIterator.prototype[iterator_1.$$iterator] = function () { return (this); };
	    StringIterator.prototype.next = function () {
	        return this.idx < this.len ? {
	            done: false,
	            value: this.str.charAt(this.idx++)
	        } : {
	            done: true,
	            value: undefined
	        };
	    };
	    return StringIterator;
	}());
	var ArrayIterator = (function () {
	    function ArrayIterator(arr, idx, len) {
	        if (idx === void 0) { idx = 0; }
	        if (len === void 0) { len = toLength(arr); }
	        this.arr = arr;
	        this.idx = idx;
	        this.len = len;
	    }
	    ArrayIterator.prototype[iterator_1.$$iterator] = function () { return this; };
	    ArrayIterator.prototype.next = function () {
	        return this.idx < this.len ? {
	            done: false,
	            value: this.arr[this.idx++]
	        } : {
	            done: true,
	            value: undefined
	        };
	    };
	    return ArrayIterator;
	}());
	function getIterator(obj) {
	    var i = obj[iterator_1.$$iterator];
	    if (!i && typeof obj === 'string') {
	        return new StringIterator(obj);
	    }
	    if (!i && obj.length !== undefined) {
	        return new ArrayIterator(obj);
	    }
	    if (!i) {
	        throw new TypeError('object is not iterable');
	    }
	    return obj[iterator_1.$$iterator]();
	}
	var maxSafeInteger = Math.pow(2, 53) - 1;
	function toLength(o) {
	    var len = +o.length;
	    if (isNaN(len)) {
	        return 0;
	    }
	    if (len === 0 || !numberIsFinite(len)) {
	        return len;
	    }
	    len = sign(len) * Math.floor(Math.abs(len));
	    if (len <= 0) {
	        return 0;
	    }
	    if (len > maxSafeInteger) {
	        return maxSafeInteger;
	    }
	    return len;
	}
	function numberIsFinite(value) {
	    return typeof value === 'number' && root_1.root.isFinite(value);
	}
	function sign(value) {
	    var valueAsNumber = +value;
	    if (valueAsNumber === 0) {
	        return valueAsNumber;
	    }
	    if (isNaN(valueAsNumber)) {
	        return valueAsNumber;
	    }
	    return valueAsNumber < 0 ? -1 : 1;
	}
	//# sourceMappingURL=IteratorObservable.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(6);
	function symbolIteratorPonyfill(root) {
	    var Symbol = root.Symbol;
	    if (typeof Symbol === 'function') {
	        if (!Symbol.iterator) {
	            Symbol.iterator = Symbol('iterator polyfill');
	        }
	        return Symbol.iterator;
	    }
	    else {
	        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
	        var Set_1 = root.Set;
	        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
	            return '@@iterator';
	        }
	        var Map_1 = root.Map;
	        // required for compatability with es6-shim
	        if (Map_1) {
	            var keys = Object.getOwnPropertyNames(Map_1.prototype);
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
	                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
	                    return key;
	                }
	            }
	        }
	        return '@@iterator';
	    }
	}
	exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
	exports.$$iterator = symbolIteratorPonyfill(root_1.root);
	//# sourceMappingURL=iterator.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(5);
	var ScalarObservable_1 = __webpack_require__(41);
	var EmptyObservable_1 = __webpack_require__(42);
	var isScheduler_1 = __webpack_require__(43);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayObservable = (function (_super) {
	    __extends(ArrayObservable, _super);
	    function ArrayObservable(array, scheduler) {
	        _super.call(this);
	        this.array = array;
	        this.scheduler = scheduler;
	        if (!scheduler && array.length === 1) {
	            this._isScalar = true;
	            this.value = array[0];
	        }
	    }
	    ArrayObservable.create = function (array, scheduler) {
	        return new ArrayObservable(array, scheduler);
	    };
	    /**
	     * Creates an Observable that emits some values you specify as arguments,
	     * immediately one after the other, and then emits a complete notification.
	     *
	     * <span class="informal">Emits the arguments you provide, then completes.
	     * </span>
	     *
	     * <img src="./img/of.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the arguments given, and the complete notification thereafter. It can
	     * be used for composing with other Observables, such as with {@link concat}.
	     * By default, it uses a `null` Scheduler, which means the `next`
	     * notifications are sent synchronously, although with a different Scheduler
	     * it is possible to determine when those notifications will be delivered.
	     *
	     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
	     * var numbers = Rx.Observable.of(10, 20, 30);
	     * var letters = Rx.Observable.of('a', 'b', 'c');
	     * var interval = Rx.Observable.interval(1000);
	     * var result = numbers.concat(letters).concat(interval);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link throw}
	     *
	     * @param {...T} values Arguments that represent `next` values to be emitted.
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emissions of the `next` notifications.
	     * @return {Observable<T>} An Observable that emits each given input value.
	     * @static true
	     * @name of
	     * @owner Observable
	     */
	    ArrayObservable.of = function () {
	        var array = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            array[_i - 0] = arguments[_i];
	        }
	        var scheduler = array[array.length - 1];
	        if (isScheduler_1.isScheduler(scheduler)) {
	            array.pop();
	        }
	        else {
	            scheduler = null;
	        }
	        var len = array.length;
	        if (len > 1) {
	            return new ArrayObservable(array, scheduler);
	        }
	        else if (len === 1) {
	            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
	        }
	        else {
	            return new EmptyObservable_1.EmptyObservable(scheduler);
	        }
	    };
	    ArrayObservable.dispatch = function (state) {
	        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
	        if (index >= count) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(array[index]);
	        if (subscriber.closed) {
	            return;
	        }
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var array = this.array;
	        var count = array.length;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ArrayObservable.dispatch, 0, {
	                array: array, index: index, count: count, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < count && !subscriber.closed; i++) {
	                subscriber.next(array[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayObservable;
	}(Observable_1.Observable));
	exports.ArrayObservable = ArrayObservable;
	//# sourceMappingURL=ArrayObservable.js.map

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(5);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ScalarObservable = (function (_super) {
	    __extends(ScalarObservable, _super);
	    function ScalarObservable(value, scheduler) {
	        _super.call(this);
	        this.value = value;
	        this.scheduler = scheduler;
	        this._isScalar = true;
	        if (scheduler) {
	            this._isScalar = false;
	        }
	    }
	    ScalarObservable.create = function (value, scheduler) {
	        return new ScalarObservable(value, scheduler);
	    };
	    ScalarObservable.dispatch = function (state) {
	        var done = state.done, value = state.value, subscriber = state.subscriber;
	        if (done) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(value);
	        if (subscriber.closed) {
	            return;
	        }
	        state.done = true;
	        this.schedule(state);
	    };
	    ScalarObservable.prototype._subscribe = function (subscriber) {
	        var value = this.value;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ScalarObservable.dispatch, 0, {
	                done: false, value: value, subscriber: subscriber
	            });
	        }
	        else {
	            subscriber.next(value);
	            if (!subscriber.closed) {
	                subscriber.complete();
	            }
	        }
	    };
	    return ScalarObservable;
	}(Observable_1.Observable));
	exports.ScalarObservable = ScalarObservable;
	//# sourceMappingURL=ScalarObservable.js.map

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(5);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var EmptyObservable = (function (_super) {
	    __extends(EmptyObservable, _super);
	    function EmptyObservable(scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits a complete notification.
	     *
	     * <span class="informal">Just emits 'complete', and nothing else.
	     * </span>
	     *
	     * <img src="./img/empty.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the complete notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then complete.</caption>
	     * var result = Rx.Observable.empty().startWith(7);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
	     * );
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link never}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
	     * the emission of the complete notification.
	     * @return {Observable} An "empty" Observable: emits only the complete
	     * notification.
	     * @static true
	     * @name empty
	     * @owner Observable
	     */
	    EmptyObservable.create = function (scheduler) {
	        return new EmptyObservable(scheduler);
	    };
	    EmptyObservable.dispatch = function (arg) {
	        var subscriber = arg.subscriber;
	        subscriber.complete();
	    };
	    EmptyObservable.prototype._subscribe = function (subscriber) {
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	        }
	        else {
	            subscriber.complete();
	        }
	    };
	    return EmptyObservable;
	}(Observable_1.Observable));
	exports.EmptyObservable = EmptyObservable;
	//# sourceMappingURL=EmptyObservable.js.map

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	function isScheduler(value) {
	    return value && typeof value.schedule === 'function';
	}
	exports.isScheduler = isScheduler;
	//# sourceMappingURL=isScheduler.js.map

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(5);
	var ScalarObservable_1 = __webpack_require__(41);
	var EmptyObservable_1 = __webpack_require__(42);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayLikeObservable = (function (_super) {
	    __extends(ArrayLikeObservable, _super);
	    function ArrayLikeObservable(arrayLike, scheduler) {
	        _super.call(this);
	        this.arrayLike = arrayLike;
	        this.scheduler = scheduler;
	        if (!scheduler && arrayLike.length === 1) {
	            this._isScalar = true;
	            this.value = arrayLike[0];
	        }
	    }
	    ArrayLikeObservable.create = function (arrayLike, scheduler) {
	        var length = arrayLike.length;
	        if (length === 0) {
	            return new EmptyObservable_1.EmptyObservable();
	        }
	        else if (length === 1) {
	            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
	        }
	        else {
	            return new ArrayLikeObservable(arrayLike, scheduler);
	        }
	    };
	    ArrayLikeObservable.dispatch = function (state) {
	        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
	        if (subscriber.closed) {
	            return;
	        }
	        if (index >= length) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(arrayLike[index]);
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
	        var length = arrayLike.length;
	        if (scheduler) {
	            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
	                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < length && !subscriber.closed; i++) {
	                subscriber.next(arrayLike[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayLikeObservable;
	}(Observable_1.Observable));
	exports.ArrayLikeObservable = ArrayLikeObservable;
	//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	var Notification_1 = __webpack_require__(46);
	/**
	 * @see {@link Notification}
	 *
	 * @param scheduler
	 * @param delay
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method observeOn
	 * @owner Observable
	 */
	function observeOn(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return this.lift(new ObserveOnOperator(scheduler, delay));
	}
	exports.observeOn = observeOn;
	var ObserveOnOperator = (function () {
	    function ObserveOnOperator(scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
	    };
	    return ObserveOnOperator;
	}());
	exports.ObserveOnOperator = ObserveOnOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ObserveOnSubscriber = (function (_super) {
	    __extends(ObserveOnSubscriber, _super);
	    function ObserveOnSubscriber(destination, scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        _super.call(this, destination);
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnSubscriber.dispatch = function (arg) {
	        var notification = arg.notification, destination = arg.destination;
	        notification.observe(destination);
	    };
	    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
	        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
	    };
	    ObserveOnSubscriber.prototype._next = function (value) {
	        this.scheduleMessage(Notification_1.Notification.createNext(value));
	    };
	    ObserveOnSubscriber.prototype._error = function (err) {
	        this.scheduleMessage(Notification_1.Notification.createError(err));
	    };
	    ObserveOnSubscriber.prototype._complete = function () {
	        this.scheduleMessage(Notification_1.Notification.createComplete());
	    };
	    return ObserveOnSubscriber;
	}(Subscriber_1.Subscriber));
	exports.ObserveOnSubscriber = ObserveOnSubscriber;
	var ObserveOnMessage = (function () {
	    function ObserveOnMessage(notification, destination) {
	        this.notification = notification;
	        this.destination = destination;
	    }
	    return ObserveOnMessage;
	}());
	exports.ObserveOnMessage = ObserveOnMessage;
	//# sourceMappingURL=observeOn.js.map

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(5);
	/**
	 * Represents a push-based event or value that an {@link Observable} can emit.
	 * This class is particularly useful for operators that manage notifications,
	 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
	 * others. Besides wrapping the actual delivered value, it also annotates it
	 * with metadata of, for instance, what type of push message it is (`next`,
	 * `error`, or `complete`).
	 *
	 * @see {@link materialize}
	 * @see {@link dematerialize}
	 * @see {@link observeOn}
	 *
	 * @class Notification<T>
	 */
	var Notification = (function () {
	    function Notification(kind, value, error) {
	        this.kind = kind;
	        this.value = value;
	        this.error = error;
	        this.hasValue = kind === 'N';
	    }
	    /**
	     * Delivers to the given `observer` the value wrapped by this Notification.
	     * @param {Observer} observer
	     * @return
	     */
	    Notification.prototype.observe = function (observer) {
	        switch (this.kind) {
	            case 'N':
	                return observer.next && observer.next(this.value);
	            case 'E':
	                return observer.error && observer.error(this.error);
	            case 'C':
	                return observer.complete && observer.complete();
	        }
	    };
	    /**
	     * Given some {@link Observer} callbacks, deliver the value represented by the
	     * current Notification to the correctly corresponding callback.
	     * @param {function(value: T): void} next An Observer `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.do = function (next, error, complete) {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return next && next(this.value);
	            case 'E':
	                return error && error(this.error);
	            case 'C':
	                return complete && complete();
	        }
	    };
	    /**
	     * Takes an Observer or its individual callback functions, and calls `observe`
	     * or `do` methods accordingly.
	     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
	     * the `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.accept = function (nextOrObserver, error, complete) {
	        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	            return this.observe(nextOrObserver);
	        }
	        else {
	            return this.do(nextOrObserver, error, complete);
	        }
	    };
	    /**
	     * Returns a simple Observable that just delivers the notification represented
	     * by this Notification instance.
	     * @return {any}
	     */
	    Notification.prototype.toObservable = function () {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return Observable_1.Observable.of(this.value);
	            case 'E':
	                return Observable_1.Observable.throw(this.error);
	            case 'C':
	                return Observable_1.Observable.empty();
	        }
	        throw new Error('unexpected notification kind value');
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `next` from a
	     * given value.
	     * @param {T} value The `next` value.
	     * @return {Notification<T>} The "next" Notification representing the
	     * argument.
	     */
	    Notification.createNext = function (value) {
	        if (typeof value !== 'undefined') {
	            return new Notification('N', value);
	        }
	        return this.undefinedValueNotification;
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `error` from a
	     * given error.
	     * @param {any} [err] The `error` error.
	     * @return {Notification<T>} The "error" Notification representing the
	     * argument.
	     */
	    Notification.createError = function (err) {
	        return new Notification('E', undefined, err);
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `complete`.
	     * @return {Notification<any>} The valueless "complete" Notification.
	     */
	    Notification.createComplete = function () {
	        return this.completeNotification;
	    };
	    Notification.completeNotification = new Notification('C');
	    Notification.undefinedValueNotification = new Notification('N', undefined);
	    return Notification;
	}());
	exports.Notification = Notification;
	//# sourceMappingURL=Notification.js.map

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ArrayObservable_1 = __webpack_require__(40);
	exports.of = ArrayObservable_1.ArrayObservable.of;
	//# sourceMappingURL=of.js.map

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mergeMap_1 = __webpack_require__(49);
	/* tslint:disable:max-line-length */
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable, in a serialized fashion waiting for each one to complete before
	 * merging the next.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link concatAll}.</span>
	 *
	 * <img src="./img/concatMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. Each new inner Observable is
	 * concatenated with the previous inner Observable.
	 *
	 * __Warning:__ if source values arrive endlessly and faster than their
	 * corresponding inner Observables can complete, it will result in memory issues
	 * as inner Observables amass in an unbounded buffer waiting for their turn to
	 * be subscribed to.
	 *
	 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
	 * to `1`.
	 *
	 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concat}
	 * @see {@link concatAll}
	 * @see {@link concatMapTo}
	 * @see {@link exhaustMap}
	 * @see {@link mergeMap}
	 * @see {@link switchMap}
	 *
	 * @param {function(value: T, ?index: number): Observable} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} an observable of values merged from the projected
	 * Observables as they were subscribed to, one at a time. Optionally, these
	 * values may have been projected from a passed `projectResult` argument.
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and taking values from each projected inner
	 * Observable sequentially.
	 * @method concatMap
	 * @owner Observable
	 */
	function concatMap(project, resultSelector) {
	    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
	}
	exports.concatMap = concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var subscribeToResult_1 = __webpack_require__(50);
	var OuterSubscriber_1 = __webpack_require__(52);
	/* tslint:disable:max-line-length */
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link mergeAll}.</span>
	 *
	 * <img src="./img/mergeMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an Observable, and then merging those resulting Observables and
	 * emitting the results of this merger.
	 *
	 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
	 * var letters = Rx.Observable.of('a', 'b', 'c');
	 * var result = letters.mergeMap(x =>
	 *   Rx.Observable.interval(1000).map(i => x+i)
	 * );
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMap}
	 * @see {@link exhaustMap}
	 * @see {@link merge}
	 * @see {@link mergeAll}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 * @see {@link switchMap}
	 *
	 * @param {function(value: T, ?index: number): Observable} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
	 * Observables being subscribed to concurrently.
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and merging the results of the Observables obtained
	 * from this transformation.
	 * @method mergeMap
	 * @owner Observable
	 */
	function mergeMap(project, resultSelector, concurrent) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	        resultSelector = null;
	    }
	    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
	}
	exports.mergeMap = mergeMap;
	var MergeMapOperator = (function () {
	    function MergeMapOperator(project, resultSelector, concurrent) {
	        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }
	    MergeMapOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
	    };
	    return MergeMapOperator;
	}());
	exports.MergeMapOperator = MergeMapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MergeMapSubscriber = (function (_super) {
	    __extends(MergeMapSubscriber, _super);
	    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
	        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	        this.hasCompleted = false;
	        this.buffer = [];
	        this.active = 0;
	        this.index = 0;
	    }
	    MergeMapSubscriber.prototype._next = function (value) {
	        if (this.active < this.concurrent) {
	            this._tryNext(value);
	        }
	        else {
	            this.buffer.push(value);
	        }
	    };
	    MergeMapSubscriber.prototype._tryNext = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.active++;
	        this._innerSub(result, value, index);
	    };
	    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
	        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
	    };
	    MergeMapSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0 && this.buffer.length === 0) {
	            this.destination.complete();
	        }
	    };
	    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            this.destination.next(innerValue);
	        }
	    };
	    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeMapSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	exports.MergeMapSubscriber = MergeMapSubscriber;
	//# sourceMappingURL=mergeMap.js.map

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var root_1 = __webpack_require__(6);
	var isArray_1 = __webpack_require__(11);
	var isPromise_1 = __webpack_require__(37);
	var Observable_1 = __webpack_require__(5);
	var iterator_1 = __webpack_require__(39);
	var InnerSubscriber_1 = __webpack_require__(51);
	var observable_1 = __webpack_require__(18);
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.closed) {
	        return null;
	    }
	    if (result instanceof Observable_1.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return null;
	        }
	        else {
	            return result.subscribe(destination);
	        }
	    }
	    if (isArray_1.isArray(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.closed) {
	            destination.complete();
	        }
	    }
	    else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.closed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) { return destination.error(err); })
	            .then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            root_1.root.setTimeout(function () { throw err; });
	        });
	        return destination;
	    }
	    else if (typeof result[iterator_1.$$iterator] === 'function') {
	        var iterator = result[iterator_1.$$iterator]();
	        do {
	            var item = iterator.next();
	            if (item.done) {
	                destination.complete();
	                break;
	            }
	            destination.next(item.value);
	            if (destination.closed) {
	                break;
	            }
	        } while (true);
	    }
	    else if (typeof result[observable_1.$$observable] === 'function') {
	        var obs = result[observable_1.$$observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error(new Error('invalid observable'));
	        }
	        else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    }
	    else {
	        destination.error(new TypeError('unknown type returned'));
	    }
	    return null;
	}
	exports.subscribeToResult = subscribeToResult;
	//# sourceMappingURL=subscribeToResult.js.map

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var InnerSubscriber = (function (_super) {
	    __extends(InnerSubscriber, _super);
	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _super.call(this);
	        this.parent = parent;
	        this.outerValue = outerValue;
	        this.outerIndex = outerIndex;
	        this.index = 0;
	    }
	    InnerSubscriber.prototype._next = function (value) {
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	    };
	    InnerSubscriber.prototype._error = function (error) {
	        this.parent.notifyError(error, this);
	        this.unsubscribe();
	    };
	    InnerSubscriber.prototype._complete = function () {
	        this.parent.notifyComplete(this);
	        this.unsubscribe();
	    };
	    return InnerSubscriber;
	}(Subscriber_1.Subscriber));
	exports.InnerSubscriber = InnerSubscriber;
	//# sourceMappingURL=InnerSubscriber.js.map

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var OuterSubscriber = (function (_super) {
	    __extends(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(innerValue);
	    };
	    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.destination.error(error);
	    };
	    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.destination.complete();
	    };
	    return OuterSubscriber;
	}(Subscriber_1.Subscriber));
	exports.OuterSubscriber = OuterSubscriber;
	//# sourceMappingURL=OuterSubscriber.js.map

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	/**
	 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
	 * @param {function} predicate a function for determining if an item meets a specified condition.
	 * @param {any} [thisArg] optional object to use for `this` in the callback
	 * @return {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
	 * @method every
	 * @owner Observable
	 */
	function every(predicate, thisArg) {
	    return this.lift(new EveryOperator(predicate, thisArg, this));
	}
	exports.every = every;
	var EveryOperator = (function () {
	    function EveryOperator(predicate, thisArg, source) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.source = source;
	    }
	    EveryOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
	    };
	    return EveryOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var EverySubscriber = (function (_super) {
	    __extends(EverySubscriber, _super);
	    function EverySubscriber(destination, predicate, thisArg, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.source = source;
	        this.index = 0;
	        this.thisArg = thisArg || this;
	    }
	    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
	        this.destination.next(everyValueMatch);
	        this.destination.complete();
	    };
	    EverySubscriber.prototype._next = function (value) {
	        var result = false;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (!result) {
	            this.notifyComplete(false);
	        }
	    };
	    EverySubscriber.prototype._complete = function () {
	        this.notifyComplete(true);
	    };
	    return EverySubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=every.js.map

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	var EmptyError_1 = __webpack_require__(55);
	/* tslint:disable:max-line-length */
	/**
	 * Emits only the first value (or the first value that meets some condition)
	 * emitted by the source Observable.
	 *
	 * <span class="informal">Emits only the first value. Or emits only the first
	 * value that passes some test.</span>
	 *
	 * <img src="./img/first.png" width="100%">
	 *
	 * If called with no arguments, `first` emits the first value of the source
	 * Observable, then completes. If called with a `predicate` function, `first`
	 * emits the first value of the source that matches the specified condition. It
	 * may also take a `resultSelector` function to produce the output value from
	 * the input value, and a `defaultValue` to emit in case the source completes
	 * before it is able to emit a valid value. Throws an error if `defaultValue`
	 * was not provided and a matching element is not found.
	 *
	 * @example <caption>Emit only the first click that happens on the DOM</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.first();
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Emits the first click that happens on a DIV</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link filter}
	 * @see {@link find}
	 * @see {@link take}
	 *
	 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
	 * callback if the Observable completes before any `next` notification was sent.
	 *
	 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
	 * An optional function called with each item to test for condition matching.
	 * @param {function(value: T, index: number): R} [resultSelector] A function to
	 * produce the value on the output Observable based on the values
	 * and the indices of the source Observable. The arguments passed to this
	 * function are:
	 * - `value`: the value that was emitted on the source.
	 * - `index`: the "index" of the value from the source.
	 * @param {R} [defaultValue] The default value emitted in case no valid value
	 * was found on the source.
	 * @return {Observable<T|R>} an Observable of the first item that matches the
	 * condition.
	 * @method first
	 * @owner Observable
	 */
	function first(predicate, resultSelector, defaultValue) {
	    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
	}
	exports.first = first;
	var FirstOperator = (function () {
	    function FirstOperator(predicate, resultSelector, defaultValue, source) {
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	    }
	    FirstOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
	    };
	    return FirstOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FirstSubscriber = (function (_super) {
	    __extends(FirstSubscriber, _super);
	    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	        this.index = 0;
	        this.hasCompleted = false;
	        this._emitted = false;
	    }
	    FirstSubscriber.prototype._next = function (value) {
	        var index = this.index++;
	        if (this.predicate) {
	            this._tryPredicate(value, index);
	        }
	        else {
	            this._emit(value, index);
	        }
	    };
	    FirstSubscriber.prototype._tryPredicate = function (value, index) {
	        var result;
	        try {
	            result = this.predicate(value, index, this.source);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this._emit(value, index);
	        }
	    };
	    FirstSubscriber.prototype._emit = function (value, index) {
	        if (this.resultSelector) {
	            this._tryResultSelector(value, index);
	            return;
	        }
	        this._emitFinal(value);
	    };
	    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
	        var result;
	        try {
	            result = this.resultSelector(value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this._emitFinal(result);
	    };
	    FirstSubscriber.prototype._emitFinal = function (value) {
	        var destination = this.destination;
	        if (!this._emitted) {
	            this._emitted = true;
	            destination.next(value);
	            destination.complete();
	            this.hasCompleted = true;
	        }
	    };
	    FirstSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
	            destination.next(this.defaultValue);
	            destination.complete();
	        }
	        else if (!this.hasCompleted) {
	            destination.error(new EmptyError_1.EmptyError);
	        }
	    };
	    return FirstSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=first.js.map

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an Observable or a sequence was queried but has no
	 * elements.
	 *
	 * @see {@link first}
	 * @see {@link last}
	 * @see {@link single}
	 *
	 * @class EmptyError
	 */
	var EmptyError = (function (_super) {
	    __extends(EmptyError, _super);
	    function EmptyError() {
	        var err = _super.call(this, 'no elements in sequence');
	        this.name = err.name = 'EmptyError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return EmptyError;
	}(Error));
	exports.EmptyError = EmptyError;
	//# sourceMappingURL=EmptyError.js.map

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	/**
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	exports.map = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}());
	exports.MapOperator = MapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = (function (_super) {
	    __extends(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=map.js.map

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	/* tslint:disable:max-line-length */
	/**
	 * Applies an accumulator function over the source Observable, and returns the
	 * accumulated result when the source completes, given an optional seed value.
	 *
	 * <span class="informal">Combines together all values emitted on the source,
	 * using an accumulator function that knows how to join a new source value into
	 * the accumulation from the past.</span>
	 *
	 * <img src="./img/reduce.png" width="100%">
	 *
	 * Like
	 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
	 * `reduce` applies an `accumulator` function against an accumulation and each
	 * value of the source Observable (from the past) to reduce it to a single
	 * value, emitted on the output Observable. Note that `reduce` will only emit
	 * one value, only when the source Observable completes. It is equivalent to
	 * applying operator {@link scan} followed by operator {@link last}.
	 *
	 * Returns an Observable that applies a specified `accumulator` function to each
	 * item emitted by the source Observable. If a `seed` value is specified, then
	 * that value will be used as the initial value for the accumulator. If no seed
	 * value is specified, the first item of the source is used as the seed.
	 *
	 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
	 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
	 *   .takeUntil(Rx.Observable.interval(5000));
	 * var ones = clicksInFiveSeconds.mapTo(1);
	 * var seed = 0;
	 * var count = ones.reduce((acc, one) => acc + one, seed);
	 * count.subscribe(x => console.log(x));
	 *
	 * @see {@link count}
	 * @see {@link expand}
	 * @see {@link mergeScan}
	 * @see {@link scan}
	 *
	 * @param {function(acc: R, value: T): R} accumulator The accumulator function
	 * called on each source value.
	 * @param {R} [seed] The initial accumulation value.
	 * @return {Observable<R>} An observable of the accumulated values.
	 * @return {Observable<R>} An Observable that emits a single value that is the
	 * result of accumulating the values emitted by the source Observable.
	 * @method reduce
	 * @owner Observable
	 */
	function reduce(accumulator, seed) {
	    var hasSeed = false;
	    // providing a seed of `undefined` *should* be valid and trigger
	    // hasSeed! so don't use `seed !== undefined` checks!
	    // For this reason, we have to check it here at the original call site
	    // otherwise inside Operator/Subscriber we won't know if `undefined`
	    // means they didn't provide anything or if they literally provided `undefined`
	    if (arguments.length >= 2) {
	        hasSeed = true;
	    }
	    return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
	}
	exports.reduce = reduce;
	var ReduceOperator = (function () {
	    function ReduceOperator(accumulator, seed, hasSeed) {
	        if (hasSeed === void 0) { hasSeed = false; }
	        this.accumulator = accumulator;
	        this.seed = seed;
	        this.hasSeed = hasSeed;
	    }
	    ReduceOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
	    };
	    return ReduceOperator;
	}());
	exports.ReduceOperator = ReduceOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ReduceSubscriber = (function (_super) {
	    __extends(ReduceSubscriber, _super);
	    function ReduceSubscriber(destination, accumulator, seed, hasSeed) {
	        _super.call(this, destination);
	        this.accumulator = accumulator;
	        this.hasSeed = hasSeed;
	        this.hasValue = false;
	        this.acc = seed;
	    }
	    ReduceSubscriber.prototype._next = function (value) {
	        if (this.hasValue || (this.hasValue = this.hasSeed)) {
	            this._tryReduce(value);
	        }
	        else {
	            this.acc = value;
	            this.hasValue = true;
	        }
	    };
	    ReduceSubscriber.prototype._tryReduce = function (value) {
	        var result;
	        try {
	            result = this.accumulator(this.acc, value);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.acc = result;
	    };
	    ReduceSubscriber.prototype._complete = function () {
	        if (this.hasValue || this.hasSeed) {
	            this.destination.next(this.acc);
	        }
	        this.destination.complete();
	    };
	    return ReduceSubscriber;
	}(Subscriber_1.Subscriber));
	exports.ReduceSubscriber = ReduceSubscriber;
	//# sourceMappingURL=reduce.js.map

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(52);
	var subscribeToResult_1 = __webpack_require__(50);
	/**
	 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
	 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
	 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
	 *  is returned by the `selector` will be used to continue the observable chain.
	 * @return {Observable} an observable that originates from either the source or the observable returned by the
	 *  catch `selector` function.
	 * @method catch
	 * @name catch
	 * @owner Observable
	 */
	function _catch(selector) {
	    var operator = new CatchOperator(selector);
	    var caught = this.lift(operator);
	    return (operator.caught = caught);
	}
	exports._catch = _catch;
	var CatchOperator = (function () {
	    function CatchOperator(selector) {
	        this.selector = selector;
	    }
	    CatchOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
	    };
	    return CatchOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CatchSubscriber = (function (_super) {
	    __extends(CatchSubscriber, _super);
	    function CatchSubscriber(destination, selector, caught) {
	        _super.call(this, destination);
	        this.selector = selector;
	        this.caught = caught;
	    }
	    // NOTE: overriding `error` instead of `_error` because we don't want
	    // to have this flag this subscriber as `isStopped`.
	    CatchSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var result = void 0;
	            try {
	                result = this.selector(err, this.caught);
	            }
	            catch (err) {
	                this.destination.error(err);
	                return;
	            }
	            this.unsubscribe();
	            this.destination.remove(this);
	            subscribeToResult_1.subscribeToResult(this, result);
	        }
	    };
	    return CatchSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	//# sourceMappingURL=catch.js.map

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mergeAll_1 = __webpack_require__(60);
	/* tslint:disable:max-line-length */
	/**
	 * Converts a higher-order Observable into a first-order Observable by
	 * concatenating the inner Observables in order.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables by putting one
	 * inner Observable after the other.</span>
	 *
	 * <img src="./img/concatAll.png" width="100%">
	 *
	 * Joins every Observable emitted by the source (a higher-order Observable), in
	 * a serial fashion. It subscribes to each inner Observable only after the
	 * previous inner Observable has completed, and merges all of their values into
	 * the returned observable.
	 *
	 * __Warning:__ If the source Observable emits Observables quickly and
	 * endlessly, and the inner Observables it emits generally complete slower than
	 * the source emits, you can run into memory issues as the incoming Observables
	 * collect in an unbounded buffer.
	 *
	 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
	 * to `1`.
	 *
	 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
	 * var firstOrder = higherOrder.concatAll();
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @see {@link combineAll}
	 * @see {@link concat}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 * @see {@link exhaust}
	 * @see {@link mergeAll}
	 * @see {@link switch}
	 * @see {@link zipAll}
	 *
	 * @return {Observable} An Observable emitting values from all the inner
	 * Observables concatenated.
	 * @method concatAll
	 * @owner Observable
	 */
	function concatAll() {
	    return this.lift(new mergeAll_1.MergeAllOperator(1));
	}
	exports.concatAll = concatAll;
	//# sourceMappingURL=concatAll.js.map

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = __webpack_require__(52);
	var subscribeToResult_1 = __webpack_require__(50);
	/**
	 * Converts a higher-order Observable into a first-order Observable which
	 * concurrently delivers all values that are emitted on the inner Observables.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables.</span>
	 *
	 * <img src="./img/mergeAll.png" width="100%">
	 *
	 * `mergeAll` subscribes to an Observable that emits Observables, also known as
	 * a higher-order Observable. Each time it observes one of these emitted inner
	 * Observables, it subscribes to that and delivers all the values from the
	 * inner Observable on the output Observable. The output Observable only
	 * completes once all inner Observables have completed. Any error delivered by
	 * a inner Observable will be immediately emitted on the output Observable.
	 *
	 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
	 * var firstOrder = higherOrder.mergeAll();
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
	 * var firstOrder = higherOrder.mergeAll(2);
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @see {@link combineAll}
	 * @see {@link concatAll}
	 * @see {@link exhaust}
	 * @see {@link merge}
	 * @see {@link mergeMap}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 * @see {@link switch}
	 * @see {@link zipAll}
	 *
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
	 * Observables being subscribed to concurrently.
	 * @return {Observable} An Observable that emits values coming from all the
	 * inner Observables emitted by the source Observable.
	 * @method mergeAll
	 * @owner Observable
	 */
	function mergeAll(concurrent) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    return this.lift(new MergeAllOperator(concurrent));
	}
	exports.mergeAll = mergeAll;
	var MergeAllOperator = (function () {
	    function MergeAllOperator(concurrent) {
	        this.concurrent = concurrent;
	    }
	    MergeAllOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new MergeAllSubscriber(observer, this.concurrent));
	    };
	    return MergeAllOperator;
	}());
	exports.MergeAllOperator = MergeAllOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MergeAllSubscriber = (function (_super) {
	    __extends(MergeAllSubscriber, _super);
	    function MergeAllSubscriber(destination, concurrent) {
	        _super.call(this, destination);
	        this.concurrent = concurrent;
	        this.hasCompleted = false;
	        this.buffer = [];
	        this.active = 0;
	    }
	    MergeAllSubscriber.prototype._next = function (observable) {
	        if (this.active < this.concurrent) {
	            this.active++;
	            this.add(subscribeToResult_1.subscribeToResult(this, observable));
	        }
	        else {
	            this.buffer.push(observable);
	        }
	    };
	    MergeAllSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0 && this.buffer.length === 0) {
	            this.destination.complete();
	        }
	    };
	    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeAllSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	exports.MergeAllSubscriber = MergeAllSubscriber;
	//# sourceMappingURL=mergeAll.js.map

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	var EmptyError_1 = __webpack_require__(55);
	/* tslint:disable:max-line-length */
	/**
	 * Returns an Observable that emits only the last item emitted by the source Observable.
	 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
	 * the last item from the source Observable, the resulting Observable will emit the last item
	 * from the source Observable that satisfies the predicate.
	 *
	 * <img src="./img/last.png" width="100%">
	 *
	 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
	 * callback if the Observable completes before any `next` notification was sent.
	 * @param {function} predicate - the condition any source emitted item has to satisfy.
	 * @return {Observable} an Observable that emits only the last item satisfying the given condition
	 * from the source, or an NoSuchElementException if no such items are emitted.
	 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
	 * @method last
	 * @owner Observable
	 */
	function last(predicate, resultSelector, defaultValue) {
	    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
	}
	exports.last = last;
	var LastOperator = (function () {
	    function LastOperator(predicate, resultSelector, defaultValue, source) {
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	    }
	    LastOperator.prototype.call = function (observer, source) {
	        return source._subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
	    };
	    return LastOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var LastSubscriber = (function (_super) {
	    __extends(LastSubscriber, _super);
	    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	        this.hasValue = false;
	        this.index = 0;
	        if (typeof defaultValue !== 'undefined') {
	            this.lastValue = defaultValue;
	            this.hasValue = true;
	        }
	    }
	    LastSubscriber.prototype._next = function (value) {
	        var index = this.index++;
	        if (this.predicate) {
	            this._tryPredicate(value, index);
	        }
	        else {
	            if (this.resultSelector) {
	                this._tryResultSelector(value, index);
	                return;
	            }
	            this.lastValue = value;
	            this.hasValue = true;
	        }
	    };
	    LastSubscriber.prototype._tryPredicate = function (value, index) {
	        var result;
	        try {
	            result = this.predicate(value, index, this.source);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            if (this.resultSelector) {
	                this._tryResultSelector(value, index);
	                return;
	            }
	            this.lastValue = value;
	            this.hasValue = true;
	        }
	    };
	    LastSubscriber.prototype._tryResultSelector = function (value, index) {
	        var result;
	        try {
	            result = this.resultSelector(value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.lastValue = result;
	        this.hasValue = true;
	    };
	    LastSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (this.hasValue) {
	            destination.next(this.lastValue);
	            destination.complete();
	        }
	        else {
	            destination.error(new EmptyError_1.EmptyError);
	        }
	    };
	    return LastSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=last.js.map

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(8);
	/* tslint:disable:max-line-length */
	/**
	 * Filter items emitted by the source Observable by only emitting those that
	 * satisfy a specified predicate.
	 *
	 * <span class="informal">Like
	 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
	 * it only emits a value from the source if it passes a criterion function.</span>
	 *
	 * <img src="./img/filter.png" width="100%">
	 *
	 * Similar to the well-known `Array.prototype.filter` method, this operator
	 * takes values from the source Observable, passes them through a `predicate`
	 * function and only emits those values that yielded `true`.
	 *
	 * @example <caption>Emit only click events whose target was a DIV element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
	 * clicksOnDivs.subscribe(x => console.log(x));
	 *
	 * @see {@link distinct}
	 * @see {@link distinctKey}
	 * @see {@link distinctUntilChanged}
	 * @see {@link distinctUntilKeyChanged}
	 * @see {@link ignoreElements}
	 * @see {@link partition}
	 * @see {@link skip}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates each value emitted by the source Observable. If it returns `true`,
	 * the value is emitted, if `false` the value is not passed to the output
	 * Observable. The `index` parameter is the number `i` for the i-th source
	 * emission that has happened since the subscription, starting from the number
	 * `0`.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {Observable} An Observable of values from the source that were
	 * allowed by the `predicate` function.
	 * @method filter
	 * @owner Observable
	 */
	function filter(predicate, thisArg) {
	    return this.lift(new FilterOperator(predicate, thisArg));
	}
	exports.filter = filter;
	var FilterOperator = (function () {
	    function FilterOperator(predicate, thisArg) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber, source) {
	        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
	    };
	    return FilterOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FilterSubscriber = (function (_super) {
	    __extends(FilterSubscriber, _super);
	    function FilterSubscriber(destination, predicate, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.predicate = predicate;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.
	    FilterSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.destination.next(value);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1.Subscriber));
	//# sourceMappingURL=filter.js.map

/***/ }
]);
//# sourceMappingURL=vendor.js.map