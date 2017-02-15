using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SantaFinder.Web.Models.ChangeOrder;

namespace SantaFinder.Web.Services.Utils
{
    public class ChangedPresentsComparer : IEqualityComparer<PresentInfoForEdit>
    {
        public bool Equals(PresentInfoForEdit x, PresentInfoForEdit y)
        {
            return x.Id == y.Id;
        }

        public int GetHashCode(PresentInfoForEdit obj)
        {
            return obj.Id;
        }
    }
}