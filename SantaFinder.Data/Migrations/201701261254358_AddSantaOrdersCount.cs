namespace SantaFinder.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSantaOrdersCount : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Santas", "NumberOfOrders", c => c.Int(nullable: false));
            Sql(@"
                update Santas
                set dbo.Santas.NumberOfOrders = isnull(so.CountOfOrders, 0)
                from Santas s left join (
                    select Santas.Id as Id, count(Santas.Id) as CountOfOrders
                    from Santas left join Orders on Orders.SantaId = Santas.Id
                    where Orders.Status = 2
                    group by Santas.Id
                ) as so on s.Id = so.Id
            ");
        }

        public override void Down()
        {
            DropColumn("dbo.Santas", "NumberOfOrders");
        }
    }
}
