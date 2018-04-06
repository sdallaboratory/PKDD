using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.EvaluationModels;
using XTool.Models.TransferModels.GraphApi;

namespace XTool.Views.ViewCode
{
    public static class Utilities
    {

        public static ReadOnlyDictionary<int, string> RomeanNumbers { get; } = new ReadOnlyDictionary<int, string>(
            new Dictionary<int, string>()
            {
                {1, "I"},
                {2, "II"},
                {3, "III"},
                {4, "IV"},
                {5, "V"},
                {6, "VI"},
                {7, "VII"},
                {8, "VIII"},
                {9, "IX"},
                {10, "X"},
                {11, "XI"},
                {12, "XII"},
                {13, "XIII"},
                {14, "XIV"},
                {15, "XV"},
                {16, "XVI"},
                {17, "XVII"},
                {18, "XVIII"},
                {10, "XIX"},
                {20, "XX"},
            }
        );

        public static ReadOnlyDictionary<string, string> RuScalesNames { get; } = new ReadOnlyDictionary<string, string>(
        new Dictionary<string, string>()
        {
            { nameof(Scales.Depression), "Депрессивность"},
            { nameof(Scales.Hypochondriasis), "Гипохондрия"},
            { nameof(Scales.Hypomania), "Гипомания"},
            { nameof(Scales.Hysteria), "Истерия"},
            { nameof(Scales.MasculinityFeminity), "Маскулинность-феминность"},
            { nameof(Scales.Paranoia), "Паранойя"},
            { nameof(Scales.Psychasthenia), "Психастения"},
            { nameof(Scales.PsychopathicDeviate), "Психопатические отклонения"},
            { nameof(Scales.Schizophrenia), "Шизофрения"},
            { nameof(Scales.SocialInteroversion), "Социальность-Интроверсия"}
        }
        );

        public static ReadOnlyDictionary<Algorithms, string> RuAlgorithmsNames { get; } = new ReadOnlyDictionary<Algorithms, string>(
        new Dictionary<Algorithms, string>()
        {
            { Algorithms.Average, "Средняя арифметическая"},
            { Algorithms.RootMeanSquare, "Среднеквадратичная"}
        });
    }
}