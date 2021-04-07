namespace API.Helpers
{
    //Will keep the cloudinary properties. Will take it from appsetings.json
    public class CloudinarySettings
    {
        public string  CloudName { get; set; }
        public string  ApiKey { get; set; }
        public string  ApiSecret { get; set; }
    }
}