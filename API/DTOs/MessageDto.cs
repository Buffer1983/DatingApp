using System;
using System.Text.Json.Serialization;
using API.Entities;

namespace API.DTOs
{
    public class MessageDto
    {
        public int Id {get; set;}
        public int SenderId {get;set;}
        public string SenderUsername {get; set;}
        public string SenderPhotoUrl {get;set;}
        public int RecipientId {get; set;}
        public string RecipientUsername {get; set;}
        public string RecipientPhotoUrl {get;set;}
        public string Content {get;set;}
        //? optional because we want to know if is not read
        public DateTime? DateRead {get;set;}
        public DateTime MessageSent {get;set;}
        
        //JsonIgnore because we dont want to expose this data to client, but only needed in messagerepository
        [JsonIgnore]
        public bool SenderDeleted {get;set;}
        [JsonIgnore]
        public bool RecipientDeleted{get;set;}
    }
}