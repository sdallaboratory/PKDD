using Pkdd.Abstractions.Entity;
using Pkdd.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pkdd.Models.Help
{
    public class Answer: EntityBase<Answer>
    {
        public int IssueId { get; set; }

        public string AnswerText { get; set; }

        public IssueUserInfo User { get; set; }

        public int Order { get; set; }

        public override Answer Update(Answer entity)
        {
            AnswerText = entity.AnswerText;
            Order = entity.Order;
            IsDeleted = entity.IsDeleted;
            return this;
        }
    }
}
