namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddChatMessageModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ChatMessages",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Body = c.String(storeType: "ntext"),
                        Datetime = c.DateTime(nullable: false),
                        OrderId = c.Int(nullable: false),
                        SenderId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Orders", t => t.OrderId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.SenderId)
                .Index(t => t.OrderId)
                .Index(t => t.SenderId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ChatMessages", "SenderId", "dbo.AspNetUsers");
            DropForeignKey("dbo.ChatMessages", "OrderId", "dbo.Orders");
            DropIndex("dbo.ChatMessages", new[] { "SenderId" });
            DropIndex("dbo.ChatMessages", new[] { "OrderId" });
            DropTable("dbo.ChatMessages");
        }
    }
}
