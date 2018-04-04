using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Models.ActorModels;
using XTool.Models.EvaluationModels;
using XTool.Models.Roles;

namespace XTool.Data.DB
{
    public static class XToolDbEntityLoading
    {


        private static T LoadNavigationCollections<T>(this T dbEntry, XToolDbContext context) where T : class
        {
            foreach (var collection in context.Entry(dbEntry).Collections)
            {
                collection.Load();
            }
            return dbEntry;
        }
        /// <summary>
        /// Выгружает из БД все поля для данного актора
        /// </summary>
        /// <param name="actor">актор</param>
        public static Actor LoadFrom(this Actor actor, XToolDbContext context)
        {
            if (actor == null)
                throw new ArgumentNullException();

            actor.LoadNavigationCollections(context);

            foreach (var period in actor.CareerPeriods)
            {
                context.Entry(period).Collection(p => p.CareerEvents).Load();
            }
            return actor;
        }

        public static Evaluation LoadFrom(this Evaluation evaluation, XToolDbContext context)
        {
            if (evaluation == null)
                throw new ArgumentNullException();

            evaluation.Actor = context.Find<Actor>(evaluation.ActorId);
            evaluation.Expert = context.Find<XToolUser>(evaluation.ExpertId);
            evaluation.Scales = context.Scales.FirstOrDefault(scales => scales.EvaluationId == evaluation.Id);

            return evaluation;
        }
    }
}
