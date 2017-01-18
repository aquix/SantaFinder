namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddLocationToClientsAndOrders : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clients", "Location_Latitude", c => c.Double(nullable: false));
            AddColumn("dbo.Clients", "Location_Longitude", c => c.Double(nullable: false));
            AddColumn("dbo.Orders", "Location_Latitude", c => c.Double(nullable: false));
            AddColumn("dbo.Orders", "Location_Longitude", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Orders", "Location_Longitude");
            DropColumn("dbo.Orders", "Location_Latitude");
            DropColumn("dbo.Clients", "Location_Longitude");
            DropColumn("dbo.Clients", "Location_Latitude");
        }
    }
}
