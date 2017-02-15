namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeOrderRatingFromFloatToInt : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Orders", "Rating", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Orders", "Rating", c => c.Single());
        }
    }
}
