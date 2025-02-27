﻿using Microsoft.EntityFrameworkCore;
using Pkdd.Abstractions.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pkdd.Models.Results
{
    [Owned]
    public class MmpiResult : IUpdatable<MmpiResult>
    {
        public int Hypochondriasis { get; set; }

        public int Depression { get; set; }

        public int Hysteria { get; set; }

        public int Psychopathia { get; set; }

        public int Masculinity { get; set; }

        public int Paranoia { get; set; }

        public int Psychasthenia { get; set; }

        public int Schizophrenia { get; set; }

        public int Hypomania { get; set; }

        public int Sociality { get; set; }

        public MmpiResult Update(MmpiResult source)
        {
            foreach(var prop in GetType().GetProperties())
            {
                prop.SetValue(this, prop.GetValue(source));
            }
            return this;
        }
    }
}
