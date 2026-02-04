namespace albums_api.Models
{
    public record Album(int Id, string Title, string Artist, int Year, double Price, string Image_url)
    {
        private static List<Album> albums = new List<Album>(){
            new Album(1, "You, Me and an App Id", "Daprize", 2020, 10.99, "https://aka.ms/albums-daprlogo"),
            new Album(2, "Seven Revision Army", "The Blue-Green Stripes", 2021, 13.99, "https://aka.ms/albums-containerappslogo"),
            new Album(3, "Scale It Up", "KEDA Club", 2022, 13.99, "https://aka.ms/albums-kedalogo"),
            new Album(4, "Lost in Translation", "MegaDNS", 2019, 12.99,"https://aka.ms/albums-envoylogo"),
            new Album(5, "Lock Down Your Love", "V is for VNET", 2020, 12.99, "https://aka.ms/albums-vnetlogo"),
            new Album(6, "Sweet Container O' Mine", "Guns N Probeses", 2021, 14.99, "https://aka.ms/albums-containerappslogo")
        };

        public static List<Album> GetAll()
        {
            return albums;
        }

        public static Album? GetById(int id)
        {
            return albums.FirstOrDefault(a => a.Id == id);
        }

        public static List<Album> GetByYear(int year)
        {
            return albums.Where(a => a.Year == year).ToList();
        }

        public static Album Create(string title, string artist, int year, double price, string image_url)
        {
            var newId = albums.Max(a => a.Id) + 1;
            var newAlbum = new Album(newId, title, artist, year, price, image_url);
            albums.Add(newAlbum);
            return newAlbum;
        }

        public static Album? Update(int id, string title, string artist, int year, double price, string image_url)
        {
            var index = albums.FindIndex(a => a.Id == id);
            if (index == -1) return null;
            
            var updatedAlbum = new Album(id, title, artist, year, price, image_url);
            albums[index] = updatedAlbum;
            return updatedAlbum;
        }

        public static bool Delete(int id)
        {
            var album = albums.FirstOrDefault(a => a.Id == id);
            if (album == null) return false;
            
            return albums.Remove(album);
        }
    }
}
