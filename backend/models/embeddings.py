from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')
# model = SentenceTransformer('paraphrase-MiniLM-L3-v2')
def embed_and_index_chunks(chunks):
    embeddings = model.encode(chunks, convert_to_numpy=True)
    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    return index, embeddings

# from sentence_transformers import SentenceTransformer
# from sklearn.neighbors import NearestNeighbors
# import numpy as np

# model = SentenceTransformer('paraphrase-MiniLM-L3-v2')

# def embed_and_index_chunks(chunks):
#     embeddings = model.encode(chunks, convert_to_numpy=True)
#     index = NearestNeighbors(n_neighbors=5, metric='euclidean')
#     index.fit(embeddings)
#     return index, embeddings

