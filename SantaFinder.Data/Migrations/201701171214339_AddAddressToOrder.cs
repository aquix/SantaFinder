namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAddressToOrder : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "UseProfileAddress", c => c.Boolean(nullable: false));
            AddColumn("dbo.Orders", "Address_City", c => c.String());
            AddColumn("dbo.Orders", "Address_Street", c => c.String());
            AddColumn("dbo.Orders", "Address_House", c => c.String());
            AddColumn("dbo.Orders", "Address_Apartment", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Orders", "Address_Apartment");
            DropColumn("dbo.Orders", "Address_House");
            DropColumn("dbo.Orders", "Address_Street");
            DropColumn("dbo.Orders", "Address_City");
            DropColumn("dbo.Orders", "UseProfileAddress");
        }
    }
}
