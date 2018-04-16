using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.ActorModels
{

    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    sealed class ScaleValueAttribute : Attribute
    {
        public ScaleValueAttribute()
        {
        }
    }
}
