using Pkdd.Abstractions.Entity;
using Pkdd.Models.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pkdd.Models.Help
{
    public class Issue : EntityBase<Issue>
    {
        public string Title { get; set; }

        public IssueType Type { get; set; }

        public string Question { get; set; }

        public List<Answer> Answers { get; set; }

        public IssueUserInfo User { get; set; }

        public bool IsSolved { get; set; }

        public override Issue Update(Issue entity)
        {
            Question = entity.Question;
            IsSolved = entity.IsSolved;
            return this;
        }
    }
}
