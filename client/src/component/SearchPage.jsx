import { useState, useEffect } from "react";
import axios from "axios";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  console.log(`มีอะไรในนี้ ${searchText}`);

  useEffect(() => {
    getData();
  }, [searchText]);

  const getData = async () => {
    try {
      const respon = await axios.get(
        `http://localhost:4001/trips?keywords=${searchText}`
      );
      setData(respon.data.data);
      console.log(respon.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <>
      <div className="flex flex-col px-4 sm:px-8 md:px-16">
        <h1 className="text-4xl text-blue-400 text-center font-bold  pt-10 ">
          เที่ยวไหนดี
        </h1>
        <div>
          <label className="flex flex-col xl:px-120 font-semibold pt-4">
            ค้นหาที่เที่ยว
            <input
              className="border-b w-full py-2 px-3 mt-2 text-center "
              type="text"
              value={searchText}
              placeholder="หาที่เที่ยวแล้วไปกัน..."
              onChange={(e) => setSearchText(e.target.value)}
            ></input>
          </label>
        </div>

        <div className="py-10">
          {data.map((d) => {
            const text = d.description;
            const limitedText = text.slice(0, 100);

            return (
              <div
                className="flex flex-col sm:flex-row justify-center gap-10 py-10"
                key={d.eid}
              >
                <img
                  className="w-full sm:w-[360px] sm:h-[260px] object-cover rounded-2xl"
                  src={d.photos[0]}
                  alt={d.title}
                />

                <div className="flex flex-col w-full sm:w-[600px]">
                  <p className="font-bold text-lg">{d.title}</p>
                  <p className="text-gray-600 ">
                    {limitedText}
                    <span>...</span>
                  </p>
                  <a
                    href={d.url}
                    target="_blank"
                    className="text-blue-500 mt-2 underline"
                  >
                    อ่านต่อ
                  </a>

                  <div className="flex flex-row gap-2 mt-2">
                    <p className="font-medium">หมวด</p>
                    {d.tags.map((tag, index) => {
                      const newTags = [...searchText, tag];
                      return (
                        <span
                          key={index}
                          onClick={() => setSearchText(`${newTags.join("")} `)}
                          className="cursor-pointer underline"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex flex-row gap-8 mt-4 w-[100px] h-[100px]">
                    {d.photos.slice(1).map((photo) => {
                      return (
                        <img key={photo} src={photo} className="rounded-md" />
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-blue-400  text-white font-semibold rounded-lg shadow-md transition-all"
                      onClick={() => copyToClipboard(d.url)}
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
