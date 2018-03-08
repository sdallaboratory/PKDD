using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using XTool.Data.Storage;
using XTool.Models;
using XTool.Models.ActorModels;
using XTool.Models.Roles;
using XTool.Models.Shared;

namespace XTool.Data.DB
{
    public static class XToolDbContextInitExtensions
    {
        public static IStorage<Tkey> Clear<Tkey>(this IStorage<Tkey> storage)
        {
            foreach (Type type in storage.GetAllTypes())
            {
                foreach (var elem in storage.GetAll(type))
                    storage.Context.Remove(elem);
                storage.Context.SaveChanges();
            }
            return storage;
        }

        public static XToolDbContext Init(this XToolDbContext context)
        {
            if (context.Actors.Count() == 0)
            {

                context.Actors.Add(new Actor()
                {
                    Name = "Навальный Алексей Анатольевич",
                    Sex = Sexes.Male,
                    Birthday = new DateTime(1985, 12, 3),
                    Position = "Партия Прогресса, председатель",
                    Photos = new List<Photo>()
                {
                    new Photo()
                    { Url = "https://antimaidan.ru/sites/default/files/styles/large/public/articles/ztlphau7wv.jpg?itok=Kaj6AW6L", Description = "У поезда" },
                    new Photo()
                    { Url = "https://antimaidan.ru/sites/default/files/styles/large/public/articles/ztlphau7wv.jpg?itok=Kaj6AW6L", Description = "У поезда" },
                    new Photo()
                    { Url = "https://antimaidan.ru/sites/default/files/styles/large/public/articles/ztlphau7wv.jpg?itok=Kaj6AW6L", Description = "У поезда" }
                },
                    Publications = new List<Publication>() { },
                    Videos = new List<Video>()
                {
                    new Video() { Url = "https://www.youtube.com/watch?v=RQZr2NgKPiU", Description = "Митинг"},
                    new Video() { Url = "https://www.youtube.com/watch?v=RQZr2NgKPiU", Description = "Митинг"},
                    new Video() { Url = "https://www.youtube.com/watch?v=RQZr2NgKPiU", Description = "Митинг"}
                },
                    BiograpphyEvents = new List<BiographyEvent>
                {
                    new BiographyEvent() { Period = "1989-1992", Description = "Был хорош."},
                    new BiographyEvent() { Period = "1993-1997", Description = "Был лучше.", Comment = "Комментарий"},
                    new BiographyEvent() { Period = "1997-2005", Description = "Был восхитителен, но не слишком успешен."},
                },
                    CareerPeriods = new List<CareerPeriod>()
                {
                    new CareerPeriod()
                    {
                        Period = "1995-2000",
                        CareerEvents = new List<CareerEvent>()
                        {
                            new CareerEvent() { Period = "1995-1996", Description = "Работал на администрацию." },
                            new CareerEvent() { Period = "1997-2000", Description = "Работал на Sas." }
                        }
                    },
                    new CareerPeriod()
                    {
                        Period = "2001-2017",
                        CareerEvents = new List<CareerEvent>()
                        {
                            new CareerEvent() { Period = "2001", Description = "Работал на администрацию." },
                            new CareerEvent() { Period = "2002-2017", Description = "Работал на Grunt." }
                        }
                    }
                },
                });
            }
            if (context.Roles.Count() == 0)
            {
                context.Roles.Add(new AdminRole());
                context.Roles.Add(new TechnologistRole());
                context.Roles.Add(new ExpertRole());
            }
            //if(context.Users.Count() == 0)
            //{
            //    string password = "123456";
            //    XToolUser user = new XToolUser()
            //    {

            //        Email = "admin@email.io",
            //        UserName = "admin@email.io",
            //    };
            //    user.PasswordHash = Handler.HashPassword(user, password);
            //    context.Users.Add(user);

            //}
            context.SaveChanges();
            return context;
        }
    }
}
