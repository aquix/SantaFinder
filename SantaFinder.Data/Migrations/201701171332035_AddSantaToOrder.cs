namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSantaToOrder : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Orders", "SantaId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Orders", "SantaId");
            AddForeignKey("dbo.Orders", "SantaId", "dbo.Santas", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "SantaId", "dbo.Santas");
            DropIndex("dbo.Orders", new[] { "SantaId" });
            DropColumn("dbo.Orders", "SantaId");
        }
    }
}
