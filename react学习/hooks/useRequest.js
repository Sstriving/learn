/*****
 * 实现一个useRequest hooks
 *  入参
 * fn需要执行的函数   dependencies依赖项
 *
 *
 *
 *
 *  */

export const useRequest = (fn, dependencies) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const request = () => {
    setLoading(true);
    let cancel = false;
    fn()
      .then((res) => {
        if (!cancel) {
          setData(res);
        } else {
          console.log("请求已取消");
        }
      })
      .catch((err) => {
        if (!cancel) {
          setError(err);
        }
      })
      .finally(() => {
        if (!cancel) {
          setLoading(false);
        }
      });
    return () => {
      cancel = true;
    };
  };

  useEffect(() => {
    const cancelRquest = request();
    return () => {
      // quxiao fule hahaha
      cancelRquest();
    };
  }, [...dependencies]);

  return { data, loading, error,request};
};


const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
 
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
 
  useEffect(() => {
    let didCancel = false;
 
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
 
      try {
        const result = await axios(url);
 
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' }); 
        }
      }
    };
 
    fetchData();
 
    return () => {
      didCancel = true;
    };
  }, [url]);
 
  return [state, setUrl];
};