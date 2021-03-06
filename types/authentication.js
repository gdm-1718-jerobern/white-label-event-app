// @flow

export type TFacebookUserInfo = {
  first_name: string,
  id: string,
  picture: {
    data: {
      height: number,
      is_silhouette: boolean,
      url: string,
      width: number,
    },
  },
  error: string,
};

export type TUser = {
  firstName: string,
  id: string,
  picture: string,
};
