using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Move : MonoBehaviour
{

    public float speed = 10.0f;
    public float horizontalInput;
    public float verticalInput;
    public float salto;
    public GameObject miObjeto;
    public GameObject miOtroObjeto;

    //variable para intercambiar desde otra clase
    public bool cambiaObjeto=false;
    void Start()
    {
        
    }

    void Update()
    {

        if (Input.GetKeyDown(KeyCode.Space))
        {
            cambiaMiObjeto();
            //GameObject clon = Instantiate(miObjeto, transform.position, transform.rotation);
            //clon.transform.localScale = Vector3.one; // Forzar tamaño correcto
        }

        horizontalInput = Input.GetAxis("Horizontal");
        verticalInput = Input.GetAxis("Vertical");
        salto = Input.GetAxis("Jump");


        // para los lados
        transform.Translate(Vector3.right * Time.deltaTime * speed * horizontalInput);
        // forward es hacia delante
        transform.Translate(Vector3.forward * Time.deltaTime * speed * verticalInput);
        //para que salte
        transform.Translate(Vector3.up * Time.deltaTime * speed * salto);
        if(transform.position.z > 20.8)
        {
            transform.position = new Vector3(transform.position.x,transform.position.y, 20.8f);
        }
        else if (transform.position.z < -19.65)
        {
            transform.position = new Vector3(transform.position.x, transform.position.y, -19.65f);
        }

        if (transform.position.x > 18.53)
        {
            transform.position = new Vector3(18.53f, transform.position.y, transform.position.z);
        }
        else if (transform.position.x < -19.53)
        {
            transform.position = new Vector3(-19.53f, transform.position.y, transform.position.z);
        }


    }
    private void cambiaMiObjeto()
    {
        GameObject clon;

        if (cambiaObjeto == true)
        {
            clon = Instantiate(miOtroObjeto, transform.position, Quaternion.identity);
        }
        else
        {
            clon = Instantiate(miObjeto, transform.position, Quaternion.identity);
        }

        clon.transform.localScale = Vector3.one;

        Collider balaCollider = clon.GetComponent<Collider>();
        Collider jugadorCollider = GetComponent<Collider>();

        if (balaCollider != null && jugadorCollider != null)
        {
            Physics.IgnoreCollision(balaCollider, jugadorCollider);
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("Colisioné con el: " + other.name);
        if (other.CompareTag("teletrasporta"))
        {
            Debug.Log("Colisioné con: " + other.name);
            transform.position = new Vector3(15.09269f, 12.36481f, 4.976336f);
        }
    }
}
