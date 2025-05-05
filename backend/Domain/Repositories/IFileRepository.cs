namespace Domain.Repositories
{
    public interface IFileRepository : IRepository<File>
    {
        public File? FirstOrDefault(Func<File, bool> predicate = null);
    }
}
