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
                {
                    storage.Context.Remove(elem);
                    storage.Context.SaveChanges();
                }
            }
            return storage;
        }

        public static XToolDbContext Init(this XToolDbContext context)
        {
            if (context.Actors.Count() == 0)
            {
                context.Actors.AddRange(new Actor()
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
                    { Url = "https://riafan.ru/uploads/2017/03/26/orig-14904818715d227bd5efa5ff62fecf839389d57a71.jpeg", Description = "У поезда" },
                    new Photo()
                    { Url = "https://regnum.ru/uploads/pictures/news/2016/12/13/regnum_picture_1481623606150274_normal.jpg", Description = "У поезда" },
                    new Photo()
                    { Url = "http://www.mk.ru/upload/entities/2017/04/27/articles/detailPicture/44/cf/33/45/a64794d2f5170efc2f9ac7a520ac1ef0.jpg", Description = "У поезда" }
                },
                    Publications = new List<Publication>() { new Publication() { Name = "Esquire" }, new Publication() { Name = "Слон", Url = "https://metanit.com/sharp/entityframeworkcore/5.1.php" } },
                    Videos = new List<Video>()
                {
                    new Video() { Url = "https://www.youtube.com/watch?v=RQZr2NgKPiU", Description = "Митинг"},
                    new Video() { Url = "https://rutube.ru/video/5b4d0065c0913ec7784e8a918e1a2e33/", Description = "Митинг"},
                    new Video() { Url = "https://www.youtube.com/watch?v=jz2xuMFT2YQ", Description = "Видео с навальным", Comment = "Это видео просто необходимо посмотреть!"},
                    new Video() { Url = "https://www.youtube.com/watch?v=ykOcbayWlTA", Description = "Митинг"},
                    new Video() { Url = "https://www.youtube.com/watch?v=Bf9zvyPachs", Description = "Навальный у Дудя"}
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
                            new CareerEvent() { Period = "1997-2000", Description = "Работал на Sas.", Comment = "Присмотритесь повнимательнее." }
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
                    CustomSection = new List<CustomSection>()
                {
                        new CustomSection() { Title = "Религиозные взгляды" , Content = "Алексей Навальный - человек искренне верующий, соблюдает посты, но в церковь ходит редко. Православие течёт в его жилах.", Comment = "Показушно всё это как-то..."},
                        new CustomSection() { Title = "Алкогольная зависимость" , Content = "Не известно, сколько галлонов вина в год употребляет политик, но известно одно - много..." }
                }
                }, new Actor() { Name = "Соколова Дарья Ильинична", Position = "Зам. министра культуры республики Татарстан", Sex = Sexes.Female, Birthday = new DateTime(1988, 11, 23) });
            }
            if (context.Roles.Count() == 0)
            {
                context.Roles.Add(new AdminRole());
                context.Roles.Add(new TechnologistRole());
                context.Roles.Add(new ExpertRole());
                context.Roles.Add(new SuperadminRole());
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
