PGDMP                     	    z            ddrhfjgr5dls05     14.5 (Ubuntu 14.5-1.pgdg20.04+1)    14.5 O    (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    92475    ddrhfjgr5dls05    DATABASE     c   CREATE DATABASE ddrhfjgr5dls05 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE ddrhfjgr5dls05;
                tbxdmlorbgyutk    false            ,           0    0    DATABASE ddrhfjgr5dls05    ACL     A   REVOKE CONNECT,TEMPORARY ON DATABASE ddrhfjgr5dls05 FROM PUBLIC;
                   tbxdmlorbgyutk    false    4395            -           0    0    ddrhfjgr5dls05    DATABASE PROPERTIES     �   ALTER DATABASE ddrhfjgr5dls05 SET search_path TO '$user', 'public', 'heroku_ext';
ALTER DATABASE ddrhfjgr5dls05 SET "TimeZone" TO 'Asia/Ho_Chi_Minh';
                     tbxdmlorbgyutk    false                        2615    92476 
   heroku_ext    SCHEMA        CREATE SCHEMA heroku_ext;
    DROP SCHEMA heroku_ext;
                u9p2lkh0ofkr0o    false            .           0    0    SCHEMA heroku_ext    ACL     4   GRANT USAGE ON SCHEMA heroku_ext TO tbxdmlorbgyutk;
                   u9p2lkh0ofkr0o    false    6            /           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO tbxdmlorbgyutk;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   tbxdmlorbgyutk    false    5            0           0    0    LANGUAGE plpgsql    ACL     1   GRANT ALL ON LANGUAGE plpgsql TO tbxdmlorbgyutk;
                   postgres    false    869            �            1259    1161851    cart_details    TABLE     �   CREATE TABLE public.cart_details (
    cart_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    total_price real NOT NULL
);
     DROP TABLE public.cart_details;
       public         heap    tbxdmlorbgyutk    false            �            1259    1161099    carts    TABLE     �   CREATE TABLE public.carts (
    id integer NOT NULL,
    total_price real NOT NULL,
    username character varying(20) NOT NULL
);
    DROP TABLE public.carts;
       public         heap    tbxdmlorbgyutk    false            �            1259    1161098    carts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.carts_id_seq;
       public          tbxdmlorbgyutk    false    223            1           0    0    carts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;
          public          tbxdmlorbgyutk    false    222            �            1259    95199 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text NOT NULL,
    image character varying(255) NOT NULL,
    updated_date timestamp with time zone
);
    DROP TABLE public.categories;
       public         heap    tbxdmlorbgyutk    false            �            1259    95204    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          tbxdmlorbgyutk    false    210            2           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          tbxdmlorbgyutk    false    211            �            1259    1522946    contacts    TABLE     �   CREATE TABLE public.contacts (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    send_date timestamp with time zone NOT NULL
);
    DROP TABLE public.contacts;
       public         heap    tbxdmlorbgyutk    false            �            1259    1522945    contact_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.contact_id_seq;
       public          tbxdmlorbgyutk    false    226            3           0    0    contact_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.contact_id_seq OWNED BY public.contacts.id;
          public          tbxdmlorbgyutk    false    225            �            1259    95205    order_details    TABLE     �   CREATE TABLE public.order_details (
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    total_price real NOT NULL
);
 !   DROP TABLE public.order_details;
       public         heap    tbxdmlorbgyutk    false            �            1259    95208    orders    TABLE     �  CREATE TABLE public.orders (
    id integer NOT NULL,
    ordered_date timestamp with time zone NOT NULL,
    delivery_date timestamp with time zone NOT NULL,
    delivery_local text NOT NULL,
    cust_name character varying(100) NOT NULL,
    cust_phone character varying(12) NOT NULL,
    total_price real NOT NULL,
    username character varying(20) NOT NULL,
    status boolean NOT NULL
);
    DROP TABLE public.orders;
       public         heap    tbxdmlorbgyutk    false            �            1259    95213    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          tbxdmlorbgyutk    false    213            4           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          tbxdmlorbgyutk    false    214            �            1259    95214    products    TABLE       CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price real NOT NULL,
    old_price real NOT NULL,
    small_desc character varying(255) NOT NULL,
    detail_desc text NOT NULL,
    for_gender character varying(6) NOT NULL,
    for_age character varying(10) NOT NULL,
    updated_date timestamp with time zone NOT NULL,
    quantity integer NOT NULL,
    image character varying(255) NOT NULL,
    cat_id integer NOT NULL,
    sup_id integer NOT NULL,
    shop_id integer NOT NULL
);
    DROP TABLE public.products;
       public         heap    tbxdmlorbgyutk    false            �            1259    95219    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          tbxdmlorbgyutk    false    215            5           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          tbxdmlorbgyutk    false    216            �            1259    95220    shops    TABLE     �   CREATE TABLE public.shops (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    telephone character varying(12) NOT NULL,
    address text NOT NULL
);
    DROP TABLE public.shops;
       public         heap    tbxdmlorbgyutk    false            �            1259    95225    shop_id_seq    SEQUENCE     �   CREATE SEQUENCE public.shop_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.shop_id_seq;
       public          tbxdmlorbgyutk    false    217            6           0    0    shop_id_seq    SEQUENCE OWNED BY     <   ALTER SEQUENCE public.shop_id_seq OWNED BY public.shops.id;
          public          tbxdmlorbgyutk    false    218            �            1259    95226 	   suppliers    TABLE     �   CREATE TABLE public.suppliers (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    telephone character varying(12) NOT NULL,
    email character varying(255) NOT NULL,
    address text
);
    DROP TABLE public.suppliers;
       public         heap    tbxdmlorbgyutk    false            �            1259    95231    suppliers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.suppliers_id_seq;
       public          tbxdmlorbgyutk    false    219            7           0    0    suppliers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;
          public          tbxdmlorbgyutk    false    220            �            1259    95232    users    TABLE     y  CREATE TABLE public.users (
    username character varying(20) NOT NULL,
    password text NOT NULL,
    firstname character varying(50) NOT NULL,
    lastname character varying(50) NOT NULL,
    gender boolean NOT NULL,
    birthdate date NOT NULL,
    telephone character varying(12) NOT NULL,
    email text NOT NULL,
    address text NOT NULL,
    role boolean NOT NULL
);
    DROP TABLE public.users;
       public         heap    tbxdmlorbgyutk    false            g           2604    1161102    carts id    DEFAULT     d   ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);
 7   ALTER TABLE public.carts ALTER COLUMN id DROP DEFAULT;
       public          tbxdmlorbgyutk    false    222    223    223            b           2604    95237    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          tbxdmlorbgyutk    false    211    210            h           2604    1522949    contacts id    DEFAULT     i   ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);
 :   ALTER TABLE public.contacts ALTER COLUMN id DROP DEFAULT;
       public          tbxdmlorbgyutk    false    226    225    226            c           2604    95238 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          tbxdmlorbgyutk    false    214    213            d           2604    95239    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          tbxdmlorbgyutk    false    216    215            e           2604    95240    shops id    DEFAULT     c   ALTER TABLE ONLY public.shops ALTER COLUMN id SET DEFAULT nextval('public.shop_id_seq'::regclass);
 7   ALTER TABLE public.shops ALTER COLUMN id DROP DEFAULT;
       public          tbxdmlorbgyutk    false    218    217            f           2604    95241    suppliers id    DEFAULT     l   ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);
 ;   ALTER TABLE public.suppliers ALTER COLUMN id DROP DEFAULT;
       public          tbxdmlorbgyutk    false    220    219            #          0    1161851    cart_details 
   TABLE DATA           R   COPY public.cart_details (cart_id, product_id, quantity, total_price) FROM stdin;
    public          tbxdmlorbgyutk    false    224   �]       "          0    1161099    carts 
   TABLE DATA           :   COPY public.carts (id, total_price, username) FROM stdin;
    public          tbxdmlorbgyutk    false    223   ^                 0    95199 
   categories 
   TABLE DATA           P   COPY public.categories (id, name, description, image, updated_date) FROM stdin;
    public          tbxdmlorbgyutk    false    210   8^       %          0    1522946    contacts 
   TABLE DATA           P   COPY public.contacts (id, name, email, subject, message, send_date) FROM stdin;
    public          tbxdmlorbgyutk    false    226   j_                 0    95205    order_details 
   TABLE DATA           T   COPY public.order_details (order_id, product_id, quantity, total_price) FROM stdin;
    public          tbxdmlorbgyutk    false    212   "`                 0    95208    orders 
   TABLE DATA           �   COPY public.orders (id, ordered_date, delivery_date, delivery_local, cust_name, cust_phone, total_price, username, status) FROM stdin;
    public          tbxdmlorbgyutk    false    213   �`                 0    95214    products 
   TABLE DATA           �   COPY public.products (id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, updated_date, quantity, image, cat_id, sup_id, shop_id) FROM stdin;
    public          tbxdmlorbgyutk    false    215   �c                 0    95220    shops 
   TABLE DATA           =   COPY public.shops (id, name, telephone, address) FROM stdin;
    public          tbxdmlorbgyutk    false    217   Oi                 0    95226 	   suppliers 
   TABLE DATA           H   COPY public.suppliers (id, name, telephone, email, address) FROM stdin;
    public          tbxdmlorbgyutk    false    219   �i                  0    95232    users 
   TABLE DATA           |   COPY public.users (username, password, firstname, lastname, gender, birthdate, telephone, email, address, role) FROM stdin;
    public          tbxdmlorbgyutk    false    221   �j       8           0    0    carts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.carts_id_seq', 41, true);
          public          tbxdmlorbgyutk    false    222            9           0    0    categories_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.categories_id_seq', 37, true);
          public          tbxdmlorbgyutk    false    211            :           0    0    contact_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.contact_id_seq', 175, true);
          public          tbxdmlorbgyutk    false    225            ;           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 30, true);
          public          tbxdmlorbgyutk    false    214            <           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 47, true);
          public          tbxdmlorbgyutk    false    216            =           0    0    shop_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.shop_id_seq', 15, true);
          public          tbxdmlorbgyutk    false    218            >           0    0    suppliers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.suppliers_id_seq', 18, true);
          public          tbxdmlorbgyutk    false    220            j           2606    95243    categories PK_categories 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_categories" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT "PK_categories";
       public            tbxdmlorbgyutk    false    210            l           2606    95245    order_details PK_orderdetail 
   CONSTRAINT     n   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "PK_orderdetail" PRIMARY KEY (order_id, product_id);
 H   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "PK_orderdetail";
       public            tbxdmlorbgyutk    false    212    212            r           2606    95247    shops PK_shop 
   CONSTRAINT     M   ALTER TABLE ONLY public.shops
    ADD CONSTRAINT "PK_shop" PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.shops DROP CONSTRAINT "PK_shop";
       public            tbxdmlorbgyutk    false    217            v           2606    95249    suppliers PK_suppliers 
   CONSTRAINT     V   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT "PK_suppliers" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT "PK_suppliers";
       public            tbxdmlorbgyutk    false    219            z           2606    95251    users PK_username 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_username" PRIMARY KEY (username);
 =   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_username";
       public            tbxdmlorbgyutk    false    221            ~           2606    1161855    cart_details cart_details_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT cart_details_pkey PRIMARY KEY (cart_id, product_id);
 H   ALTER TABLE ONLY public.cart_details DROP CONSTRAINT cart_details_pkey;
       public            tbxdmlorbgyutk    false    224    224            |           2606    1161104    carts carts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            tbxdmlorbgyutk    false    223            �           2606    1522953    contacts contact_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.contacts DROP CONSTRAINT contact_pkey;
       public            tbxdmlorbgyutk    false    226            n           2606    95253    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            tbxdmlorbgyutk    false    213            p           2606    95255    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            tbxdmlorbgyutk    false    215            t           2606    95257    shops uq_shop 
   CONSTRAINT     M   ALTER TABLE ONLY public.shops
    ADD CONSTRAINT uq_shop UNIQUE (telephone);
 7   ALTER TABLE ONLY public.shops DROP CONSTRAINT uq_shop;
       public            tbxdmlorbgyutk    false    217            x           2606    95259    suppliers uq_suppliers 
   CONSTRAINT     ]   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT uq_suppliers UNIQUE (telephone, email);
 @   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT uq_suppliers;
       public            tbxdmlorbgyutk    false    219    219            �           2606    212555    products FK_categories    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_categories" FOREIGN KEY (cat_id) REFERENCES public.categories(id) ON DELETE CASCADE NOT VALID;
 B   ALTER TABLE ONLY public.products DROP CONSTRAINT "FK_categories";
       public          tbxdmlorbgyutk    false    215    210    4202            �           2606    212565    products FK_shops    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_shops" FOREIGN KEY (shop_id) REFERENCES public.shops(id) ON DELETE CASCADE NOT VALID;
 =   ALTER TABLE ONLY public.products DROP CONSTRAINT "FK_shops";
       public          tbxdmlorbgyutk    false    217    4210    215            �           2606    212560    products FK_suppliers    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_suppliers" FOREIGN KEY (sup_id) REFERENCES public.suppliers(id) ON DELETE CASCADE NOT VALID;
 A   ALTER TABLE ONLY public.products DROP CONSTRAINT "FK_suppliers";
       public          tbxdmlorbgyutk    false    219    4214    215            �           2606    1161856 &   cart_details cart_details_cart_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT cart_details_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.cart_details DROP CONSTRAINT cart_details_cart_id_fkey;
       public          tbxdmlorbgyutk    false    4220    224    223            �           2606    1161861 )   cart_details cart_details_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_details
    ADD CONSTRAINT cart_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.cart_details DROP CONSTRAINT cart_details_product_id_fkey;
       public          tbxdmlorbgyutk    false    215    224    4208            �           2606    1161586    carts carts_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE NOT VALID;
 C   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_username_fkey;
       public          tbxdmlorbgyutk    false    223    4218    221            �           2606    1325866 )   order_details order_details_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE NOT VALID;
 S   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_order_id_fkey;
       public          tbxdmlorbgyutk    false    213    4206    212            �           2606    1325871 +   order_details order_details_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE NOT VALID;
 U   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_product_id_fkey;
       public          tbxdmlorbgyutk    false    212    4208    215            �           2606    1536489    orders orders_username_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON DELETE CASCADE NOT VALID;
 E   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_username_fkey;
       public          tbxdmlorbgyutk    false    213    4218    221            #      x�36�42�4�42�3������� T�      "      x�36�42�3��,)J��+����� 4}�         "  x�m�Mk�0��+r5�$�Vn-ݠl�;��`�5���4��_�d���F�9H�j^��)^��x��7u��|k�e����e4��v7[�o�O�P�
�̚���R��X����eq,����C ����5'1�Ķ�49�9��_Y�g�_Ƈ(�i_���7@�:1�E�|��cϷ�}m��Xx�q��Y^u׈rFXĭoW�SPH��Dg�z.ʟ��Y�w[{�i�Y-l�=�Uwi�nvS5M;����؈/������߷p�3I�H{��1��(�~I���      %   �   x�M�;�0���+�n ��X|-�'�Zm�^-��/u"99'9��쪍���gYE�~zH$��$�c-}���#�kǐ#�)��CZ7<[��y�UՆ�Q�Z?/ȣ �X2=s��}�>L����ǟ/��3<MP)�`&o�e��ҁ���Šݼg��dE�eR`��mߒ(�~��=Z         �   x�M���0C��0F�K���d�|���'�Y(L�0�@k��px�m^jc�U��#�3l�c����>V�_�K�y�/Q�6�p&���>�	V[ up��+-q�l9ख़Qm��t*�����A�p��u�y�=�L�:����d�,3��^-"         �  x���OO�@�ϛO�����������T�"j�^z1!%��]�])߾��ظ�"EQ�q��fޛPh��iH�q�9�l|�����U���o�ϛ�V/�v���R~^�v�U�O���� Xؠ��/�7���d`C����!�c�'f��EY�rB�b#�GW�JYv�&J
�	��z}��X H�8 �� ��Jl,�N�Y��ϕ4#�X?�ҝ���|��Y�Ⱥ�<7�y_xk]L4����ކ)�C�A� $��!�Md�H�8X1}� �8����Ѝ=�
\a�I���.2�K����D��u�N�f�ź�$q�G'��
,��n�+��#�����0t Q#�@zO�������S���kޓ���x�}��,%å��/��+ч��]���eC�g��\P*�3��zB2:�.�}w�9o��?ڞ��{1�]��sPΛ�Z��uƆÃ���=��d
��rp�_��nQū����n��q��IЙ�`����)�����3���#���,���ij0��m��1Z�k����nV�v����u������~ο>��M�l���L����6R�ʁ�{��MD��dB���<;Y}S�q���>���U�,����$�J�A]����Z����Ӓ��~Y}Q�|Z&����f�Y�b#��˕����J��=����fݼ��         �  x��XMo�H=�_�}�U՟ܒ�j3+�4JF�e$�qH�;��0�������B�8Ją��u���kPeWU�\����C�˫�CNy��ԇC�n�C���p�{�v���>l��K�m��;K���~h?�΀��/@\ �%�Raa����QZ+e���Y��n��ߗ�m�2�B��u�����Z��B��|'`��������%�B��J�
���,U`�&�$�'�f���@f V$�_�O�"��2O�;A��^b��TX�����>�4��&�D�8"J=Q�]�զ�?W���wx���e�7O�N���:�A A+7��1$�-�6�f�gN��Y
�ܺz��"e�gH�zL�xt����Uo��h�Ј��<�R(%�{�	�"�왪`Ѻ�A_�Ou{��`Q��TT-�1U�H(��"DCϓ�?3�m����NX���(&�K�%��
�����X ����%W�b�s_q������ym�q'��o/ѕ�h�T�V8Q[G*Q%��2��z�?G�c\����	Ub)Uဤ��*I�E�J��Jn}n �n����i��n�{��e!�|�st�����̅)ɔ��p�
3�3%!}۳ָڞX���[~�}]v�9v5G'X�A�f%BAZ	��&�6ب�f�"i?��f�Z~���@X:\��@l� ��;���+�0� ��4���5"��K�M�>�S���ڳǜQ�%)y����͕�HT��T[ia%�a�H?|�En���)�m��o�6����`��N�Hi%	Lۜ*�a/.��֎���a[��
������:�

�	&��z������n��	����v�+�H��.��U��l"��g�W%�Y����u�����'���GN.		��)��@�����
��~�$S i�O�$&����}�?|���2�%h��.U����!�)wܛ�s�
iw��K����1�!N���Ɯ ����\��<`��ҥ�H���5�5$`��Ȯ�M״<h�N�d�w &%�\���)�"�~:�,ȑ8jr�Iq����L	���P?�y���&�����'n>�JJcaMbȄ���T�DSp�99���]��pR�Ȝ�xn%�l�~˿��-�Eg�!BOl�L!8��XK�*6i�M��	ߔg�8�T��c[K��@ .�'�V�0�l��6�ۀ� ::n e�W8���Q������<�d��� �6�����24�kx�Z\�͐|��`9���ڏ���s<�<{U|>H��ь����(�Ʌ+�(��� ν뙋�� ��.�,*>�Ni_3�n��P�uj�� X<9�Rq�'%�grm9�H?��Yܭ�Wn~�~�1/�S���|������ŁN>j猕��/�$��>�(��[N�g��9���;�[�Ad8;�@KC��ɺ8�A7�N����?����>�a���������,(���x�+@��g^-�o�o�j���K��         �   x�]�!�0@Ql��'��.N\���EC#QU%&�4u�z��`$�'�B^i֔7
u'��VX,��P�}��u��8xh�4ג�M�`z?Xw@��Ҙ��'_tۑ����q0��4�D�w�jYV|^��	0         �   x�MͿ�0����}��?)�	���R��M�g�������o~�\��MJ#��Z	����6�'BK��C��ifX��vޓ]$*m����j;ẨE�R��u��'����U>��9�|k��C	(��{��6���le7>汍��
��c&B�          �  x���Ks�H����`�e�����EQQ�f�4O�H���4&�<�_3S�.(��=�\������_6��y���6���ޖ0�����=Yv��QR�S�.�;ǐj�N3�����H B�B�uۏ��s"N�M�-�P�ҸȀ�rJGy�J-�<��EQ����1Β�~pa5��?ǵ0�͡����.��溜\�J{+��y�����$�"(�`�AՂ�](w� �"��Ĳ�bO`fAS�_)�xʮ� �^�~N-bB�P�RfKl$���X�	n^4�8qA�;x�Hc�څv2}g]\h����h�,dg=�uGp\�}��O<��8�M TT�i@�n�,R��l��҅,�� �,+2������|B��H~����z0
�b��tl���1�	s�%��Л����E�nt�!�6¾.��h���y���(�6��2�ќ$H<È��{r��TM��M/~��Nr�*ELg��X����|�ZH�O���I�J?fr^0��r�j�O���7VӅ�u�B@��xA�dܤ"���B��B�=ikv�����3�p�Ih+J�g&�����0z�k����p԰��8���u ͭ�^��|J��;Y�1�_BO.�Ŝ�A���)۱d���Fi1�M�/��|}t��_Ǟ`�#uɞY��Y�`��~���E�ۥ��W�97�i�%2�.���M�{j_�$���w�������dV�!um����C��\�R�"'���J<��2�+���f�_,#6&�(�/�{dMfϑ�S����|����Ҡݣ�`����b�}L�̴�(Ao�f���\��S[G�e�LO?��� 6����c���E��P�\P��Kݟ�I�7~#\1;?I��\��]�X��"]�r8vvQ�	sF�cK��2��ס��e��!_�h�e+Q_�������3z�KR4�����VF�����%^���o�4�r��*}Ѝ�iY/�00"�O��[n�!D�R�W3��LWK�/���/�����Nw:�? �%�     