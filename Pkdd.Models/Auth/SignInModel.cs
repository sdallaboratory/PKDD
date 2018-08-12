namespace Pkdd.Models.Auth
{
    public class SignInModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public bool Remember { get; set; }
    }
}
