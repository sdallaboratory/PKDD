using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.;
using XTool.Models.EvaluationModels;

namespace XTool.Algorithms
{
    public static class ScalesStatistics
    {
        /// <summary>
        /// Возвращает набор оценок, из которых удалено (100 - selectProcent) процентов крайних оценок (отсечены выбросы).
        /// </summary>
        /// <param name="scalesCollection"></param>
        /// <param name="selectionPercent"></param>
        /// <returns></returns>
        private static IEnumerable<Scales> RemoveOutliers(this IEnumerable<Scales> scalesCollection, double selectionPercent = 50)
        {
            if (selectionPercent > 100 || selectionPercent < 0)
                throw new ArgumentException("Аргумент выражается в процентах [0; 100]");
            Dictionary<int, double> expectations = scalesCollection.AverageDictionary();
            return scalesCollection.OrderBy(scales => scales.OutlineIndex(expectations))
                .Take(Math.Max((int)selectionPercent * scalesCollection.Count(), 1));
        }

        /// <summary>
        /// Транспонирует матрицу, составленную построчно из набора объектов, содержащих по 10 значений.
        /// </summary>
        /// <param name="scalesCollection"></param>
        /// <returns></returns>
        private static IEnumerable<int>[] TransposeScales(this IEnumerable<Scales> scalesCollection) =>
            scalesCollection.SelectMany(scalesItem => scalesItem.Values.Select((val, i) => new { index = i, value = val }))
            .GroupBy(pair => pair.index)
            .Select(groupsCollection => groupsCollection.Select(groupItem => groupItem.value))
            .ToArray();


        /// <summary>
        /// Возвращает словарь, содержащий средние значения от набора объектов шкал.
        /// </summary>
        /// <param name="scalesCollection"></param>
        /// <returns></returns>
        private static Dictionary<int, double> AverageDictionary(this IEnumerable<Scales> scalesCollection) => new Dictionary<int, double>(
            scalesCollection.TransposeScales().Select((valuesCollection, i) => new KeyValuePair<int, double>(i, valuesCollection.Average())));



        /// <summary>
        /// Возвращает среднеквадратичную дистанцию данной величины относительно заданного набора значений
        /// </summary>
        /// <param name="valuesCollection">Набор значений</param>
        /// <param name="comparedValue">Величина, для которой ищется расстояние</param>
        private static double RootMeanSquareDistance(this IEnumerable<int> valuesCollection, int comparedValue) =>
            RootMeanSquareDistance(valuesCollection.Average(), comparedValue);

        /// <summary>
        /// Возвращает среднеквадратичную дистанцию данной величины относительно заданного значения математического ожидания
        /// </summary>
        /// <param name="expectation">Математическое ожидание</param>
        /// <param name="comparedValue">Величина, для которой ищется расстояние</param>
        private static double RootMeanSquareDistance(double expectation, int comparedValue) =>
            Math.Pow(expectation - comparedValue, 2);

        private static double StandardDeviation(this IEnumerable<int> valuesCollection)
        {
            double expectation = valuesCollection.Average();
            return Math.Sqrt(valuesCollection.Average(val => RootMeanSquareDistance(expectation, val)));
        }

        /// <summary>
        /// Возвращает словарь, в котором ключ - номер шкалы, а значение - среднеквадратичное отклонение для шкалы по всему набору объектов.
        /// </summary>
        /// <param name="scalesCollection"></param>
        /// <returns></returns>
        private static Dictionary<int, double> StandardDeviation(this IEnumerable<Scales> scalesCollection)
        {
            IEnumerable<int>[] transposedScales = scalesCollection.TransposeScales();
            return new Dictionary<int, double>(
                transposedScales.Select((valuesCollection, i) => new KeyValuePair<int, double>(
                    i, valuesCollection.StandardDeviation())));
        }

        /// <summary>
        /// Возвращает усреднённое среднеквадратичное расстояние шкал данного объекта от средних арифметических наборов значений, распределённых по шкалам.
        /// </summary>
        /// <param name="expectation">Математическое ожидание</param>
        /// <param name="comparedValue">Величина, для которой ищется расстояние</param>
        private static double OutlineIndex(this Scales comparedScales, Dictionary<int, double> expectations) =>
            comparedScales.Values.Select((val, i) => RootMeanSquareDistance(expectations[i], val)).Average();

        /// <summary>
        /// Возвращает показатель отклонения данной оценки от набора оценок.
        /// </summary>
        /// <param name="scalesCollection">исходный набор оценок.</param>
        /// <param name="scales">Целевая оценка для сравнения.</param>
        public static double OutierIndex(this IEnumerable<Scales> scalesCollection, Scales scales) => scales.OutlineIndex(scalesCollection.AverageDictionary());

        /// <summary>
        /// Возвращает среднюю арифметическую оценку на основе исходного набора оценок.
        /// </summary>
        /// <param name="scalesCollection"></param>
        /// <returns></returns>
        public static Scales Average(this IEnumerable<Scales> scalesCollection) => new Scales(scalesCollection.AverageDictionary().Values.OfType<int>());

        /// <summary>
        /// Возвращает среднее квадратичное значения шкал по набору исходных оценок с учётом отсечения крайних.
        /// </summary>
        /// <param name="scalesCollection">Значение в процентах, показывающее какую часть исхожной выборки оставлять после отсечения</param>
        /// <returns></returns>
        public static Scales RootMeanSquare(this IEnumerable<Scales> scalesCollection, double selectionPercent = 100) => new Scales(
        scalesCollection.RemoveOutliers().TransposeScales().Select(valuesCollection => (int)(Math.Sqrt(valuesCollection.Average(val => val * val)))));

        public static double AccuracyIndex(this IEnumerable<Scales> scalesCollection, Scales scales)
        {
            Dictionary<int, double> expectations = scalesCollection.AverageDictionary();
            return scales.OutlineIndex(expectations) / scalesCollection.Max(scal => scal.OutlineIndex(expectations));
        }
    }
}
