import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { VFC } from 'react';

import {
  GetCategoriesQuery,
  GetPrefecturesQuery,
  useGetCategoriesQuery,
  useGetPrefecturesQuery,
} from '../apollo/graphql';
import { addApolloState, initializeApollo } from '../apollo/apolloClient';
import { GET_PREFECTURES } from '../apollo/queries/prefectureQueries';
import { GET_CATEGORIES } from '../apollo/queries/categoryQueries';

import { Layout } from '../components/Commons/Layout';
import { AreaPrefecture } from '../components/Uncommons/AreaPrefecture';

const Home: VFC = () => {
  const categories = useGetCategoriesQuery();
  const categoryNameList = categories.data;
  const categoryError = categories.error;

  // if (error) {
  //   return <div>{error.message}</div>;
  // }
  if (categoryError) {
    return <div>categoryError:{categoryError.message}</div>;
  }
  return (
    <Layout title="R-MEN">
      <div className="bg-r-men-img w-full object-contain bg-contain xl:bg-cover pb-14">
        <div className="md:w-1/3 z-10 h-64">
          <div className="grid grid-cols-3 place-content-center h-16 py-5">
            <Link href="/">
              <a className="text-gray-700 text-center px-4 py-2 m-2 font-medium">
                Login
              </a>
            </Link>
            <Link href="/">
              <a className="text-gray-700 text-center px-4 py-2 m-2 font-medium">
                Sign Up
              </a>
            </Link>
            <Link href="/">
              <a className="text-gray-700 text-center px-4 py-2 m-2 font-medium">
                Guest
              </a>
            </Link>
          </div>

          <div className="pt-2">
            <p className="text-5xl text-red-400 font-serif text-center">
              R-MEN
            </p>
            <p className="text-2xl font-bold text-black-400 font-serif text-center py-4">
              find your best r-men
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <h1 className="mx-auto text-4xl text-center font-serif ">
          おすすめから探す
        </h1>
        <div className="grid grid-cols-2 place-content-center h-16 py-5 my-5">
          <p className="text-center mb-5">各エリアランキングTOP20</p>
          <p className="text-center mb-5">ユーザーおすすめ一覧</p>
          <p className="text-center">SNSで話題のラーメン</p>
          <p className="text-center">運営おすすめ</p>
        </div>
      </div>
      <div className="container mx-auto pb-10">
        <h1 className="mx-auto text-4xl text-center font-serif">
          カテゴリから探す
        </h1>
        <div className="grid grid-cols-6 h-auto py-5 my-5 w-2/3 mx-auto">
          {categoryNameList?.categories?.map((category) => {
            return (
              <p className="text-center py-2" key={category.id}>
                {category.name}
              </p>
            );
          })}
        </div>
      </div>

      <AreaPrefecture />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<GetPrefecturesQuery>({
    query: GET_PREFECTURES,
  });

  await apolloClient.query<GetCategoriesQuery>({
    query: GET_CATEGORIES,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
};

export default Home;