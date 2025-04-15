﻿using MediatR;

namespace SchoolMoney.Commands
{
    public class DeleteUserCommand : IRequest<Unit>
    {
        public int UserId { get; set; }
    }
}
