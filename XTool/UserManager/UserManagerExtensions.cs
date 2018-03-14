using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using XTool.Models.Roles;
using System.ComponentModel.DataAnnotations;
using XTool.Models.TransferModels;

namespace XTool.UserManager
{
    public static class UserManagerExtensions
    {
        public static async Task<OperationResult> RegisterUserAsync(this UserManager<XToolUser> userManager, UserRegisterModel model)
        {
            Statuses status = Statuses.Error;
            string message = null;
            if (false) // настроить валидацию модели 
                message = "Введены некорректные данные!";
            else if (model.Password != model.PasswordRepeat)
                message = "Пароли не совпадают!";
            else if (await userManager.FindByEmailAsync(model.Email) != null)
                message = "Пользователем с таким Email уже зарегистрирован в системе!";
            else
            {
                var newUser = new XToolUser() { Email = model.Email, FullName = model.Name, UserName = model.Email };
                var suc = await userManager.CreateAsync(newUser);
                if (!suc.Succeeded)
                {
                    message = "Произошла ошибка при создании аккаунта.";
                }
                else if((await userManager.UpdatePasswordAsync(newUser, model.Password)).StatusCode != Statuses.Ok)
                {
                    message = "Произошла ошибка при настройке пароля.";
                }
                else if (!(await userManager.AddToRoleAsync(newUser, model.RoleName.ToLower())).Succeeded)
                {
                    message = "Не удалось настроить роль пользователя.";
                }
                else 
                {
                    message = $"Аккаунт {newUser.Email} успешно зарегистрирован. В ближайшее время администратор подтвердит ваш аккаунт и вы сможете войти в систему.";
                    status = Statuses.Ok;
                }
            }
            return new OperationResult() { StatusCode = status, Message = message };
        }

        public static async Task<OperationResult> UpdatePasswordAsync(this UserManager<XToolUser> userManager, XToolUser user, string newPassword )
        {
            OperationResult result;
            // настроить валидацию пароля
            if (user.PasswordHash != userManager.PasswordHasher.HashPassword(user, newPassword))
            {
                user.PasswordHash = userManager.PasswordHasher.HashPassword(user, newPassword);
                await userManager.UpdateAsync(user);
                 result = new OperationResult() { StatusCode = Statuses.Ok, Message = "Пароль успешно изменён." };
            }
            else
                 result = new OperationResult() { StatusCode = Statuses.AlreadyDone, Message = "Новый и текущий пароли совпадают" };
            return result;
        }

        public static async Task<OperationResult> ConfirmUserAsync(this UserManager<XToolUser> userManager, XToolUser user)
        {
            OperationResult result;
            if (!user.IsConfirmed)
            {
                user.IsConfirmed = true;
                await userManager.UpdateAsync(user);
                result = new OperationResult() { StatusCode = Statuses.Ok, Message = "Пользователь успешно подтверждён." };
            }
            else
                result = new OperationResult() { StatusCode = Statuses.AlreadyDone, Message = "Новый и текущий пароли совпадают" };
            return result;
        }

        public static async Task<OperationResult> BanUserAsync(this UserManager<XToolUser> userManager, XToolUser user)
        {
            OperationResult result;
            if (!user.IsBanned)
            {
                user.IsBanned = true;
                await userManager.UpdateAsync(user);
                result = new OperationResult() { StatusCode = Statuses.Ok, Message = "Пользователь успешно забанен." };
            }
            else
                result = new OperationResult() { StatusCode = Statuses.AlreadyDone, Message = "Пользователь был забанен ранее." };
            return result;
        }

        public static async Task<OperationResult> UnbanUserAsync(this UserManager<XToolUser> userManager, XToolUser user)
        {
            OperationResult result;
            if (user.IsBanned)
            {
                user.IsBanned = false;
                await userManager.UpdateAsync(user);
                result = new OperationResult() { StatusCode = Statuses.Ok, Message = "Пользователь успешно забанен." };
            }
            else
                result = new OperationResult() { StatusCode = Statuses.AlreadyDone, Message = "Не удалось разбанить пользователя, так как он не был забанен." };
            return result;
        }
    }
}
