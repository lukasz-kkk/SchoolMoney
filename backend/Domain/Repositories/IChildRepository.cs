﻿namespace Domain.Repositories
{
    public interface IChildRepository : IRepository<Child>
    {
        new Child Get(int id);
        new List<Child> GetList(Func<Child, bool> predicate = null);
    }
}
