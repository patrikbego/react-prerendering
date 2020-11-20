import {getUserData} from "./users";

it('tests get user by id', async () => {
  let mockResponse1 = JSON.stringify({name: "Patrik", surname: 'Bego', about: 'Test'});
  fetch.mockResponseOnce(mockResponse1);
  const response = await getUserData('patrik.bego');
  expect(response.name).toEqual("Patrik")
  expect(response.surname).toEqual("Bego")
});

it('tests get non existing user', async () => {
  let mockResponse1 = JSON.stringify({});
  fetch.mockResponseOnce(mockResponse1);
  const response = await getUserData('test');
  expect(response.name).toEqual("Patrik")
  expect(response.surname).toEqual("Bego")
});
