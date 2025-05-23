﻿using MediatR;

namespace SchoolMoney.Commands
{
    public class CreateGroupCommand : IRequest<Unit>
    {
        public string Name { get; set; }
    }
}
