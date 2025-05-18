using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

public class Bala : MonoBehaviour
{
    public float speed = 20f;
    public float posZ = 29;
    void Start()
    {
        
    }

    void Update()
    {
        transform.Translate(Vector3.forward * speed * Time.deltaTime);
        if(transform.position.z > posZ)
        {
            Destroy(this.gameObject);
        }
    }
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Destructible"))
        {
            Debug.Log("Colisioné con: " + other.name);
            Destroy(other.gameObject); // destruye la caja
            Destroy(this.gameObject);  // destruye la bala
        }
    }
}

