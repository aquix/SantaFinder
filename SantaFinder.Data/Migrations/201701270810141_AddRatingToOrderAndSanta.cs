namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRatingToOrderAndSanta : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Santas", "Rating", c => c.Single());
            AddColumn("dbo.Orders", "Rating", c => c.Single());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Orders", "Rating");
            DropColumn("dbo.Santas", "Rating");
        }
    }
}
