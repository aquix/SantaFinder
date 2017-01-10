using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;

namespace SantaFinder.Web.Util
{
    public class SantaRegisterMultipartMediaTypeFormatter : MediaTypeFormatter
    {
        public SantaRegisterMultipartMediaTypeFormatter()
        {
            SupportedMediaTypes.Add(new MediaTypeHeaderValue("multipart/form-data"));
        }

        public override bool CanReadType(Type type) => true;

        public override bool CanWriteType(Type type) => true;

        public override async Task<object> ReadFromStreamAsync(Type type, Stream readStream, HttpContent content, IFormatterLogger formatterLogger)
        {
            var parts = await content.ReadAsMultipartAsync();
            var obj = Activator.CreateInstance(type);
            var propertiesFromObj = obj.GetType().GetRuntimeProperties().ToList();

            foreach (var property in propertiesFromObj.Where(x => x.PropertyType == typeof(FileModel)))
            {
                var file = parts.Contents.FirstOrDefault(x =>
                    x.Headers.ContentDisposition.Name.ToLower().Contains(property.Name.ToLower()));

                if (file == null || file.Headers.ContentLength <= 0)
                    continue;

                try
                {
                    var fileModel = new FileModel
                    {
                        Filename = file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                        ContentLength = Convert.ToInt32(file.Headers.ContentLength),
                        Content = ReadFile(file.ReadAsStreamAsync().Result)
                    };
                    property.SetValue(obj, fileModel);
                }
                catch (Exception)
                {
                }
            }

            foreach (var property in propertiesFromObj.Where(x => x.PropertyType != typeof(FileModel)))
            {
                var formData = parts.Contents.FirstOrDefault(x =>
                    x.Headers.ContentDisposition.Name.ToLower().Contains(property.Name.ToLower()));

                if (formData == null)
                    continue;

                try
                {
                    var strValue = formData.ReadAsStringAsync().Result;
                    var valueType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                    var value = Convert.ChangeType(strValue, valueType);
                    property.SetValue(obj, value);
                }
                catch (Exception)
                {
                }
            }

            return obj;
        }

        private byte[] ReadFile(Stream input)
        {
            var buffer = new byte[16 * 1024];
            using (var memoryStream = new MemoryStream())
            {
                input.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}