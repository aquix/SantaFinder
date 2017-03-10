namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddAdmins : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Admins",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Id)
                .Index(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Admins", "Id", "dbo.AspNetUsers");
            DropIndex("dbo.Admins", new[] { "Id" });
            DropTable("dbo.Admins");
        }
    }
}
