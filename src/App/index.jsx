import React, { useEffect, useState } from 'react';

const useRndNumGen = ({ min, max }) => {
  const [rndNum, setRndNum] = useState(0);

  const generateRndNum = () => {
    min = Math.ceil(min);
    max = Math.floor(max);

    setRndNum(Math.floor(Math.random() * (max - min + 1) + min));
  };

  return { rndNum, generateRndNum };
};

const useRndNumForm = () => {
  const [range, setRange] = useState({ min: '1', max: '10' });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;

    setRange((state) => ({ ...state, [name]: value }));
  };

  return { form: range, onChange };
};

const useRndImg = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgs, setImgs] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_CLOUDINARY_URL}/image/list/meme.json`
        );
        if (!response.ok) {
          throw new Error('failed to get cloudinary images');
        }
        const result = await response.json();
        setImgs(result.resources);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  const setRandomImg = () => {
    setSelectedImg(imgs[Math.floor(Math.random() * imgs.length)]);
  };

  return { selectedImg, setRandomImg };
};

function App() {
  const { form, onChange } = useRndNumForm();
  const { rndNum, generateRndNum } = useRndNumGen(form);
  const { selectedImg, setRandomImg } = useRndImg();

  const onSubmit = () => {
    generateRndNum();
    setRandomImg();
  };
  return (
    <div
      className={'root root--loaded'}
      style={
        selectedImg
          ? {
              backgroundImage: `url(${process.env.REACT_APP_CLOUDINARY_URL}/image/${selectedImg?.type}/v${selectedImg?.version}/${selectedImg?.public_id}.${selectedImg?.format})`,
            }
          : {}
      }
    >
      <>
        {<h1 className="number">{rndNum ? rndNum : 'Boludez'}</h1>}
        <div className="inputs">
          <div className="inputs__group inputs__min-group">
            <label htmlFor="min">Min</label>
            <input
              className="input inputs__min-input"
              name="min"
              onChange={onChange}
              value={form.min}
            />
          </div>
          <div className="inputs__group inputs__max-group">
            <label>Max</label>
            <input
              className="input inputs__max-input"
              name="max"
              onChange={onChange}
              value={form.max}
            />
          </div>
        </div>
        <button className="button button--generate">
          <img
            height={100}
            width={100}
            alt="argentina flag"
            src="https://cdn.countryflags.com/thumbs/argentina/flag-round-250.png"
            onClick={onSubmit}
          />
        </button>
      </>
    </div>
  );
}

export default App;
