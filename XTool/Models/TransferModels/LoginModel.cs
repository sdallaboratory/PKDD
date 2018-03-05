using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace XTool.Models.TransferModels
{
    public class LoginModel : IUpdateble
    {
        [Required(ErrorMessage = "Введите e-mail")]
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }

        public bool? Remember { get; set; }

        public IUpdateble Update(IUpdateble model)
        {
            throw new NotImplementedException();
        }
    }
}
