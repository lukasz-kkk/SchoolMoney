﻿using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class ChildRepository : Repository<Child>, IChildRepository
    {
        public ChildRepository(AppDbContext appDbContext) 
            : base(appDbContext, appDbContext.Children)
        {
        }

        public new Child? Get(int id)
        {
            return _appDbContext.Children
                .Include(child => child.Parent)
                .Include(child => child.Group)
                .FirstOrDefault(child => child.Id == id);
        }

        public new List<Child> GetList(Func<Child, bool> predicate = null)
        {
            if (predicate == null)
                return _appDbContext.Children.ToList();
            return _appDbContext.Children
                .Include(child => child.Parent)
                .Include(child => child.Group)
                .Where(predicate)
                .ToList();
        }

    }
}
