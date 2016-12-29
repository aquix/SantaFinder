using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using SantaFinder.Data.Entities;

namespace SantaFinder.Data.Context
{
    public interface IDbContext
    {
        IDbSet<User> Users { get; set; }

        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
