import { create } from "domain";

export const creatomate = {
  api_url: "https://api.creatomate.com/v1/renders",
  api_key:
    "dc99169c0a694116bec3adc17e05f88c380ebf009834abe6b4df86e701e4ef26241fd5dc5cd6da60f9daafcaad29eafe",
  public_token: "public-bt7zyncar7mi9jwjyc4rc5u8",
};

export const headers = {
  creatomate: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${creatomate.api_key}`,
  },
};

export const pexels = {
  api_key: "0mDt40xC108JzgbolvL156iIIvXhttpZME01NbzDfQUYU0EXdJxvG9tI",
};
