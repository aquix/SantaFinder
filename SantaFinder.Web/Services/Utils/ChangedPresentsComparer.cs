using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Web.Models.ChangeOrder;

namespace SantaFinder.Web.Services.Utils
{
    public class ChangedPresentsComparer : IEqualityComparer<ChangedPresentInfo>
    {
        public bool Equals(ChangedPresentInfo x, ChangedPresentInfo y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode(ChangedPresentInfo obj)
        {
            return obj.Id;
        }
    }
}