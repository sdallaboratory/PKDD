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
            if (!context.Actors.Any())
            {
                context.Actors.AddRange(

                // Актор 1 (Навальный)
                new Actor()
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
                },

                // Актор 2 
                new Actor() { Name = "Соколова Дарья Ильинична", Position = "Зам. министра культуры республики Татарстан", Sex = Sexes.Female, Birthday = new DateTime(1988, 11, 23) },

                // Актор 3 (Винни пух)
                new Actor()
                {
                    Name = "Винни Пух",
                    Sex = Sexes.Male,
                    Birthday = new DateTime(1921, 8, 21),
                    Position = "Поедатель мёда, ООО \"Шервудский лес.\"",
                    Photos = new List<Photo>()
                {
                    new Photo()
                    { Url = "https://gdb.rferl.org/4B360FAF-0FC8-44D4-A3F7-CA4B659F9845_w1023_r1_s.jpg", Description = "Винни Пух на холме. Фото 1969 года." },
                    new Photo()
                    { Url = "https://i.ytimg.com/vi/J-UHwBgvG70/maxresdefault.jpg", Description = "Винни в компании друзей" },
                    new Photo()
                    { Url = "https://gdb.rferl.org/230637D0-D6EA-442F-89CF-C5983F9DB3CF_cx0_cy10_cw0_w1023_r1_s.jpg", Description = "Трапеза Винни и Пятачка. Культовая сцена." }
                },
                    Publications = new List<Publication>() { new Publication() { Name = "Дао Винни Пуха" , Url = "https://www.ozon.ru/context/detail/id/144123486/?gclid=Cj0KCQjwkd3VBRDzARIsAAdGzMBf_fSPre-FBGbhl3kve7dRDp7NiNfFeLNQpSuJWmwzIAO5xWE7CeIaAuDWEALw_wcB&gclsrc=aw.ds&dclid=CPOsgOOSiNoCFQiIsgodx50LOQ", Year = 2018},
                        new Publication() { Name = "Песенки Винни-Пуха (+ CD)", Url = "https://www.ozon.ru/context/detail/id/5387228/?gclid=Cj0KCQjwkd3VBRDzARIsAAdGzMBY-pKmWCl5CY8tjlnHKI-2ZtbJRTYDIwKos47O1GD8BWfwYlEFPA0aAhmtEALw_wcB&gclsrc=aw.ds&dclid=CPrVyOOSiNoCFQLFsgod1GsMPw", Year = 2010} },
                    Videos = new List<Video>()
                {
                    new Video() { Url = "https://www.youtube.com/watch?v=vEY3fFtrnzs", Description = "История создания советского Винни Пуха | Наталья Боброва"},
                    new Video() { Url = "https://www.youtube.com/watch?v=7G_fYgW5Tys", Description = "Винни Пух — Все серии подряд", Comment = "Винни Пух мультфильм Все серии подряд. Первый советский мультфильм-экранизация по одноимённой сказке А. Милна."},
                    new Video() { Url = "https://rutube.ru/video/35a209a9954e7c8221cde31a2974caff/", Description = "3 серия. Винни-Пух и день забот." },
                },
                    BiograpphyEvents = new List<BiographyEvent>
                {
                    new BiographyEvent() { Period = "1921", Description = "Рождение. Алан Милн придумал персонажа для сказок своему сыну."},
                    new BiographyEvent() { Period = "1930", Description = "Произведение переведено на польсктий язык.", Comment = "Это был не единственный перевод на польский, но именно он стал классическим в этой стране."},
                    new BiographyEvent() { Period = "1969-1971", Description = "Съёмки советсвой экранизации книги Милна."},
                },
                    CustomSection = new List<CustomSection>()
                {
                        new CustomSection() { Title = "Рецензия Вишевской Ирины" , Content = "Все в этой книге прекрасно. Классический текст в переводе Заходера, дополненный песенками Винни из всеми любимого мультфильма, тонированные страницы, крупные иллюстрации на каждой странице. Но самое главное - это именно иллюстрации Антоненкова. Иллюстрировать Винни-Пуха пробовали многие художники, и у каждого он получался своеобразный. Но именно у Антоненкова образ Винни максимально совпадает с авторским. Это настоящий плюшевый, наивный, немного глуповатый, по-детски смотрящий на мир медвежонок. Такую гармонию образов автора и художника редко встретишь. Да и все остальные персонажи максимально приближены к авторскому видению. И кролик, и ослик, и Кристофер Робин, и особенно великолепно прорисованный Пятачок - самое настоящее чудо. Это действительно великолепный подарок и детям и родителям.", Comment = "Показушно всё это как-то..."},
                }
                });
            }

            //if (!context.Users.Any())
            //{
            //    string password = "";
            //    xtooluser user = new xtooluser()
            //    {

            //        email = "admin@email.io",
            //        username = "admin@email.io",
            //    };
            //    user.passwordhash = handler.hashpassword(user, password);
            //    context.users.add(user);

            //}

            context.SaveChanges();
            return context;
        }
    }
}
