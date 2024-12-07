import { useMutation } from '@tanstack/react-query';

export const useMutationHandler = (mutationFn, options = {}) => {

  return useMutation({
    mutationFn,
    onSuccess: (data) => {

        //save authToken if present
      if (data?.authToken) {
        localStorage.setItem("authToken", data.authToken);
      }

      //this is run if onSuccess is passed
      options?.onSuccess?.(data);  // Additional custom success handling if needed defined in page

      //console success message only if it is passed
      if(options.successMessage){
        console.log('Success::',options.apiTitle,'::',options.successMessage) 
      } 
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        console.log('Error::',errorData ?? error)

        //console error message only if it is passed
        if(options.errorMessage){
            console.log('Error::',options.apiTitle,'::',errorMessage,)
        }
      }

      //this is run if onError is passed
      options?.onError?.(error);  // Additional custom error handling if needed defined in page
    },
  });
};
