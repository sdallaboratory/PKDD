﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace XTool.Models.EvaluationModels
{
   [ComplexType]
    public class Scales : IEnumerable<int>
    {
        [NotMapped]
        public static IReadOnlyList<string> ScalesNames { get; }

        static Scales() => ScalesNames = typeof(Scales).GetProperties().Select(prop => prop.Name).ToList();

        private readonly int[] _values = new int[ScalesNames.Count]; // м.б. перенести в обычной конструктор

        private int IndexOf(string name) => ScalesNames.Select((n, i) => new { curName = n, index = i })
            .FirstOrDefault(pair => pair.curName == name).index;

        public IEnumerator<int> GetEnumerator() => ((IEnumerable<int>)_values).GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => ((IEnumerable<int>)_values).GetEnumerator();

        [NotMapped]
        public int this[int i]
        {
            get => _values[ScalesNames.Count()];
            set => _values[i] = value;
        }

        public int Hypochondriasis
        {
            get => _values[IndexOf(nameof(Hypochondriasis))];
            set => _values[IndexOf(nameof(Hypochondriasis))] = value;
        }

        public int Depression
        {
            get => _values[IndexOf(nameof(Depression))];
            set => _values[IndexOf(nameof(Depression))] = value;
        }

        public int Hysteria
        {
            get => _values[IndexOf(nameof(Hysteria))];
            set => _values[IndexOf(nameof(Hysteria))] = value;
        }

        public int PsychopathicDeviate
        {
            get => _values[IndexOf(nameof(PsychopathicDeviate))];
            set => _values[IndexOf(nameof(PsychopathicDeviate))] = value;
        }

        public int MasculinityFeminity
        {
            get => _values[IndexOf(nameof(MasculinityFeminity))];
            set => _values[IndexOf(nameof(MasculinityFeminity))] = value;
        }

        public int Paranoia
        {
            get => _values[IndexOf(nameof(Paranoia))];
            set => _values[IndexOf(nameof(Paranoia))] = value;
        }

        public int Psychasthenia
        {
            get => _values[IndexOf(nameof(Psychasthenia))];
            set => _values[IndexOf(nameof(Psychasthenia))] = value;
        }

        public int Schizophrenia
        {
            get => _values[IndexOf(nameof(Schizophrenia))];
            set => _values[IndexOf(nameof(Schizophrenia))] = value;
        }

        public int Hypomania
        {
            get => _values[IndexOf(nameof(Hypomania))];
            set => _values[IndexOf(nameof(Hypomania))] = value;
        }

        public int SocialInteroversion
        {
            get => _values[IndexOf(nameof(SocialInteroversion))];
            set => _values[IndexOf(nameof(SocialInteroversion))] = value;
        }
    }
}
