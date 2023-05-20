--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: field; Type: TABLE; Schema: public; Owner: some_user
--

CREATE TABLE public.field (
    id integer NOT NULL,
    header character varying,
    type character varying,
    placeholder character varying,
    form_page integer NOT NULL
);


ALTER TABLE public.field OWNER TO some_user;

--
-- Name: fileld_id_seq; Type: SEQUENCE; Schema: public; Owner: some_user
--

ALTER TABLE public.field ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fileld_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: forms; Type: TABLE; Schema: public; Owner: some_user
--

CREATE TABLE public.forms (
    id integer NOT NULL,
    name character varying NOT NULL,
    code character varying NOT NULL
);


ALTER TABLE public.forms OWNER TO some_user;

--
-- Name: forms_id_seq; Type: SEQUENCE; Schema: public; Owner: some_user
--

ALTER TABLE public.forms ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.forms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: page; Type: TABLE; Schema: public; Owner: some_user
--

CREATE TABLE public.page (
    id integer NOT NULL,
    form integer NOT NULL
);


ALTER TABLE public.page OWNER TO some_user;

--
-- Name: page_id_seq; Type: SEQUENCE; Schema: public; Owner: some_user
--

ALTER TABLE public.page ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.page_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: submition; Type: TABLE; Schema: public; Owner: some_user
--

CREATE TABLE public.submition (
    id integer NOT NULL,
    form integer NOT NULL
);


ALTER TABLE public.submition OWNER TO some_user;

--
-- Name: submition_id_seq; Type: SEQUENCE; Schema: public; Owner: some_user
--

ALTER TABLE public.submition ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.submition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: submition_value; Type: TABLE; Schema: public; Owner: some_user
--

CREATE TABLE public.submition_value (
    value character varying NOT NULL,
    field integer NOT NULL,
    id integer NOT NULL,
    submition integer NOT NULL
);


ALTER TABLE public.submition_value OWNER TO some_user;

--
-- Name: submition_value_id_seq; Type: SEQUENCE; Schema: public; Owner: some_user
--

ALTER TABLE public.submition_value ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.submition_value_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: field; Type: TABLE DATA; Schema: public; Owner: some_user
--

COPY public.field (id, header, type, placeholder, form_page) FROM stdin;
11	ФИО	text	Калинин Илья Юрьевич	9
12	Оценка	number	100000	10
13	Клик	checkbox	Текст	11
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: some_user
--

COPY public.forms (id, name, code) FROM stdin;
5	test	admin
6	Тест	admin
\.


--
-- Data for Name: page; Type: TABLE DATA; Schema: public; Owner: some_user
--

COPY public.page (id, form) FROM stdin;
9	5
10	5
11	5
\.


--
-- Data for Name: submition; Type: TABLE DATA; Schema: public; Owner: some_user
--

COPY public.submition (id, form) FROM stdin;
14	5
\.


--
-- Data for Name: submition_value; Type: TABLE DATA; Schema: public; Owner: some_user
--

COPY public.submition_value (value, field, id, submition) FROM stdin;
Илья	11	13	14
1000000000000	12	14	14
true	13	15	14
\.


--
-- Name: fileld_id_seq; Type: SEQUENCE SET; Schema: public; Owner: some_user
--

SELECT pg_catalog.setval('public.fileld_id_seq', 13, true);


--
-- Name: forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: some_user
--

SELECT pg_catalog.setval('public.forms_id_seq', 6, true);


--
-- Name: page_id_seq; Type: SEQUENCE SET; Schema: public; Owner: some_user
--

SELECT pg_catalog.setval('public.page_id_seq', 11, true);


--
-- Name: submition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: some_user
--

SELECT pg_catalog.setval('public.submition_id_seq', 14, true);


--
-- Name: submition_value_id_seq; Type: SEQUENCE SET; Schema: public; Owner: some_user
--

SELECT pg_catalog.setval('public.submition_value_id_seq', 15, true);


--
-- Name: field fileld_pk; Type: CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.field
    ADD CONSTRAINT fileld_pk PRIMARY KEY (id);


--
-- Name: forms forms_pk; Type: CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pk PRIMARY KEY (id);


--
-- Name: page page_pk; Type: CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.page
    ADD CONSTRAINT page_pk PRIMARY KEY (id);


--
-- Name: submition submition_pk; Type: CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.submition
    ADD CONSTRAINT submition_pk PRIMARY KEY (id);


--
-- Name: submition_value submition_value_pk; Type: CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.submition_value
    ADD CONSTRAINT submition_value_pk PRIMARY KEY (id);


--
-- Name: fileld_form_page_idx; Type: INDEX; Schema: public; Owner: some_user
--

CREATE INDEX fileld_form_page_idx ON public.field USING btree (form_page);


--
-- Name: page_form_idx; Type: INDEX; Schema: public; Owner: some_user
--

CREATE INDEX page_form_idx ON public.page USING btree (form);


--
-- Name: field fileld_fk; Type: FK CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.field
    ADD CONSTRAINT fileld_fk FOREIGN KEY (form_page) REFERENCES public.page(id);


--
-- Name: page page_fk; Type: FK CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.page
    ADD CONSTRAINT page_fk FOREIGN KEY (form) REFERENCES public.forms(id);


--
-- Name: submition submition_fk; Type: FK CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.submition
    ADD CONSTRAINT submition_fk FOREIGN KEY (form) REFERENCES public.forms(id);


--
-- Name: submition_value submition_value_fk; Type: FK CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.submition_value
    ADD CONSTRAINT submition_value_fk FOREIGN KEY (submition) REFERENCES public.submition(id);


--
-- Name: submition_value submition_value_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: some_user
--

ALTER TABLE ONLY public.submition_value
    ADD CONSTRAINT submition_value_fk_1 FOREIGN KEY (field) REFERENCES public.field(id);


--
-- PostgreSQL database dump complete
--

