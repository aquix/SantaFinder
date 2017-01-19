namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddOrderModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ChildrenNames = c.String(),
                        Datetime = c.DateTime(nullable: false),
                        ClientId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Clients", t => t.ClientId)
                .Index(t => t.ClientId);
            
            CreateTable(
                "dbo.Presents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        BuyBySanta = c.Boolean(nullable: false),
                        OrderId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId, cascadeDelete: true)
                .Index(t => t.OrderId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Presents", "OrderId", "dbo.Orders");
            DropForeignKey("dbo.Orders", "ClientId", "dbo.Clients");
            DropIndex("dbo.Presents", new[] { "OrderId" });
            DropIndex("dbo.Orders", new[] { "ClientId" });
            DropTable("dbo.Presents");
            DropTable("dbo.Orders");
        }
    }
}
