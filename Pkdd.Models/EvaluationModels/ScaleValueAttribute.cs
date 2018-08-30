using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pkdd.Models
{

    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    sealed class ScaleValueAttribute : Attribute
    {
        public ScaleValueAttribute()
        {
        }
    }
}
