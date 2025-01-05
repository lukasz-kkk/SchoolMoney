﻿using MediatR;

namespace PrzedszkolePlus.Commands
{
    public class CreateAnnouncementCommand : IRequest<Unit>
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string FilePath { get; set; }
    }
}
