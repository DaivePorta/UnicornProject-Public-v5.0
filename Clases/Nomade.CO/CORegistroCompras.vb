Public Class CORegistroCompras
    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function listar_cotizacion_detalle(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_LISTAR_DETALLE_SOLIC_COTIZA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function listar_cotizacion(ByVal P_CATALOGO As String, ByVal P_SUCURSAL As String, ByVal P_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_LISTAR_COTIZACIONES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function


    Public Function COMPLETAR_SOLICITUD(ByVal v_code As String) As String
        Try



            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_COMPLETAR_SOLICITUD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", v_code, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "ok"

            Return msg

        Catch ex As Exception

            Throw (ex)
        End Try
    End Function



    Public Function DELETE_DETALLE_SOLICITUD_EDITAR(ByVal v_code As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("DELETE_DETALLE_SOLICITUD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_DETALLE", v_code, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "ok"

            Return msg

        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function CRAR_LOTE_PRODUCCION(ByVal P_CODE_FTVOFAB As String, ByVal P_SECCION_ALM As String, ByVal P_FECHAINI As Date, ByVal P_FECHAFIN As Date,
                                         ByVal P_CANTIDAD As String, ByVal P_ESTADO As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_CRAR_LOTE_PRODUCCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_FTVOFAB", P_CODE_FTVOFAB, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SECCION_ALM", P_SECCION_ALM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHAINI", Convert.ToDateTime(P_FECHAINI).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHAFIN", Convert.ToDateTime(P_FECHAFIN).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", String.Empty, ParameterDirection.Output, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg(1) = cmd1.Parameters("@P_CODIGO").Value
            msg(2) = "ok"

            Return msg

        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function CREAR_DETALLE_ORD_FABRICACION(ByVal p_TEXT_COMP As String, ByVal v_code As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_CREAR_DETALLE_ORD_FABRICACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT_COMP", p_TEXT_COMP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", v_code, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "ok"

            Return msg

        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function CREAR_ORDEN_FABRICACION(ByVal P_FECHA_REGISTRO As Date, ByVal P_DESCRIPCION As String, ByVal P_ESTADO As String, ByVal P_FABRICACION As String,
                                            ByVal P_RESPONSABLE As String, ByVal P_TEXT As String, ByVal P_CATALOGO As String, ByVal P_SUCURSAL As String, ByVal P_CANTIDAD As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_CREAR_ORD_FABRICACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_REGISTRO", Convert.ToDateTime(P_FECHA_REGISTRO).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESCRIPCION", P_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FABRICACION", P_FABRICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RESPONSABLE", P_RESPONSABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT", P_TEXT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", String.Empty, ParameterDirection.Output, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg(1) = cmd1.Parameters("@P_CODIGO").Value
            msg(2) = "ok"

            Return msg

        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function BUSCAR_PROCESAMIENTO_SOLICITUD(ByVal P_CATALOGO As String, ByVal P_SUCURSAL As String, ByVal P_FECHAINI As Date, ByVal P_FECHAFIN As Date) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_BUSCAR_PROCESAMIENTO_SOLICITUD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHAINI", Convert.ToDateTime(P_FECHAINI).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHAFIN", Convert.ToDateTime(P_FECHAFIN).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function
    Public Function LISTAR_DETALLE_PROCESAMIENTO(ByVal P_CODE As String, ByVal P_ESTADO As String, Optional ByVal P_FASE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_LISTAR_DETALLE_PROCESAMIENTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FASE", P_FASE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function
    Public Function LISTAR_PROCESAMIENTO_SOLICITUD(ByVal P_CATALOGO As String, ByVal P_SUCURSAL As String, ByVal P_ESTADO As String, ByVal P_CODE As String, Optional ByVal P_FASE As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_LISTAR_PROCESAMIENTO_SOLICITUD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FASE", P_FASE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function CREAR_DETALLE_PRODUCION(ByVal p_TEXT_COMP As String, ByVal v_code As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_CREAR_DETALLE_PRODUCCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT_COMP", p_TEXT_COMP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", v_code, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "ok"

            Return msg

        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function CREAR_PROCESA_SOLICITUD(ByVal P_CATALOGO As String, ByVal P_SURCURSAL As String, ByVal P_FECHAINI As String,
                                             ByVal P_FECHAFIN As String, ByVal P_GLOSA As String, ByVal P_PRODUCTO As String, ByVal P_TOTAL As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_CREAR_PROCESA_SOLICITUD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SURCURSAL", P_SURCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHAINI", Convert.ToDateTime(P_FECHAINI).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHAFIN", Convert.ToDateTime(P_FECHAFIN).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_GLOSA", P_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PRODUCTO", P_PRODUCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TOTAL", P_TOTAL, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(1) = cmd1.Parameters("@p_CODIGO").Value
            msg(2) = "ok"

            Return msg

        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_DETALLE_APROBADO_SOLIC_PROD(ByVal P_CODIGO As String, ByVal P_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_DETALLE_APROBADO_SOLIC_PROD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", P_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function
    Public Function APROBACION_DETALLE_SOLIC_PRU(ByVal P_TEXT As String, ByVal P_USU_APRO As String, ByVal P_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_APRO_DETALL_SOLI_PROD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", P_TEXT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUARIO", P_USU_APRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))

            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function
    Public Function DELETE_DETALLE_SOLIC_PROD(ByVal p_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_DELETE_DETALLE_SOLIC_PROD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function
    Public Function LISTAR_DETALLE_DEFINIDO_SOLIC_PROD(ByVal p_CODE As String, ByVal P_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_DETALLE_DEFINIDO_SOLIC_PROD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_CABECERA_DEFINIADA_SOLIC_PRODUCC(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CABECERA_DEFINIADA_SOLIC_PRODUCC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_CABECERA_SOLIC_PRODUCCIOM(ByVal p_CATALOGO As String, ByVal p_ESTABLE As String, ByVal p_USUARIO As String, Optional ByVal p_ESTADO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CABECERA_SOLIC_PRODUCCIOM", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLE", p_ESTABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function
    Public Function GRABAR_DETALLE_SOLIC_PRODUCCION(ByVal p_CODE_CABECERA As String, ByVal p_TXT As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_GRABAR_DETALLE_SOLIC_PRODUCCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_TXT, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function
    Public Function PFB_CREAR_REGISTRO_PRODUCCION(ByVal p_SOLICITA As String, ByVal p_FECHA As String, ByVal p_PRIORIDAD As String,
                                             ByVal p_TIPOREQ As String,
                                             ByVal p_CECC_CODE As String, ByVal p_CECD_CODE As String, ByVal p_GLOSA As String,
                                             ByVal p_CATALOGO As String, ByVal p_ESTABLECIMIENTO As String, ByVal p_REQUE As String, ByVal p_CLIENTE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_REGISTRO_PRODUCCION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_SOLICITA", p_SOLICITA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRIORIDAD", p_PRIORIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPOREQ", p_TIPOREQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC_CODE", p_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD_CODE", p_CECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLECIMIENTO", p_ESTABLECIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_REQUE", p_REQUE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CLIENTE", p_CLIENTE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODIGO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function LISTA_DETALLE_SOLICITUD(ByVal P_CODIGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTA_DETALLE_SOLICITUD", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", P_CODIGO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_CODIGO_COTIZACION(ByVal P_CATALOGO As String, ByVal P_SUCURSAL As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CODIGO_COTIZACION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SUCURSAL, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_DEVULVE_CORREO(ByVal P_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_DEVULVE_CORREO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@PIDM", P_PIDM, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_LISTA_ORDEN_COMPRA(ByVal P_CATALOGO As String, ByVal P_SUCURSAL As String, Optional ByVal P_PIDM As String = "", Optional ByVal p_EST_CANC As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_ORDCOMPRA", CommandType.StoredProcedure) '

            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM", P_PIDM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_EST_CANC", p_EST_CANC, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function DEVULVE_NUMERO_CORRELATIVO() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_DEVULVE_CORRELATIVO", CommandType.StoredProcedure)

            'cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function MODIFICAR_CORRELATIVO(ByVal P_TIPO As String, ByVal P_NOMBRE As String, ByVal P_TIPO_UPDA As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_UPDATE_CORRELATIVO", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_NOMBRE", P_NOMBRE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_UPDA", P_TIPO_UPDA, ParameterDirection.Input, 253))



            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function DEVUELVE_CONFIGURACION(ByVal P_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_DEVUELVE_CONFIGURACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_DETALLE_ORDCOMPRA(ByVal P_CODIGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PPB_DETALLE_ORDCOMPRA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODIGO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_CONTACTOS(ByVal P_PIDM_PERSONA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PPB_CONTACTOS_ORDEN", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_PERSONA", P_PIDM_PERSONA, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_CABECERA_ORDCOMPRA(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CABEC_ORDCOMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function CREAR_DETALLE_ORDENCOMPRA(ByVal p_CODE_CABECERA As String, ByVal p_TXT As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFB_GRABAR_DETALL_ORD_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_TXT, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function



    Public Function CREAR_DETALLE_ORDENCOMPRA_ADQUISICION(ByVal p_CODE_CABECERA As String, ByVal p_TXT As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFB_GRABAR_DETALL_ORD_COMPRA_ADQUISICION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_TXT, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function MODIFICAR_DETALLE_ORDENCOMPRA(ByVal p_CODE_CABECERA As String, ByVal p_TXT As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFB_MODIFICAR_DETALL_ORD_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_TXT, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function



    Public Function CREAR_DETALLE_ORDENCOMPRA_ADQUISICION_COMPLETAR(ByVal p_CODE_CABECERA As String, ByVal p_TXT As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFB_GRABAR_DETALL_ORD_COMPRA_ADQUISICION_COMPLETAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_TXT, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function MODIFICAR_DETALLE_ORDENCOMPRA_REQUE(ByVal p_CODE_CABECERA As String, ByVal p_TXT As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFB_MODIFICAR_DETALL_ORD_COMPRA_ADQUI", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_TXT, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function


    Public Function MODIFICAR_DETALLE_ORDENCOMPRA_REQUE_COMPLETAR(ByVal p_CODE_CABECERA As String, ByVal p_TXT As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFB_MODIFICAR_DETALL_ORD_COMPRA_ADQUI_COMPLETAR", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_TXT, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function
    Public Function CREAR_ORDEN_COMPRA(
                                      ByVal p_DOC_REGIS As String, ByVal p_DOC_REGIS_NRO As String, ByVal p_CATALOGO As String,
                                      ByVal p_ESTABLEC As String, ByVal p_PROVEDOR As String, ByVal p_FECHA_TRANSAC As String,
                                      ByVal p_FECHA_EMISION As String, ByVal p_DOC_ORIG As String, ByVal p_DOC_ORIG_NRO As String,
                                      ByVal p_DESPACHO As String, ByVal p_ENTREGA As String, ByVal p_TRANSPORTISTA As String,
                                      ByVal p_TIPO_TRANSPOR As String, ByVal p_MODO_PAGO As String, ByVal p_PLAZO_PAGO As Integer,
                                      ByVal p_FECHAV_PAGO As String, ByVal p_ESTADO_PAGO As String, ByVal p_MONETAR_MONEDA As String,
                                      ByVal p_MONETAR_BASE_IMP As Decimal, ByVal p_MONETAR_DESCUENTO As Decimal, ByVal p_MONETAR_ISC As Decimal,
                                      ByVal p_MONETAR_SUBTOTAL As Decimal, ByVal p_MONETAR_IGVPOR As Decimal, ByVal p_MONETAR_IGVSOL As Decimal,
                                      ByVal p_MONETAR_AJUST As Decimal, ByVal p_MONETAR_PREC_TOTAL As Decimal, ByVal p_MONETAR_DETRACCION As Decimal,
                                      ByVal p_MONETAR_PERCEPCION As Decimal, ByVal p_MONETAR_RETENCION As Decimal, ByVal p_MONETAR_PAGAR As Decimal,
                                      ByVal p_TRIBUTAC_SUJETODETRA As String, ByVal p_TRIBUTAC_SUJETOPERS As String, ByVal p_TRIBUTAC_SUJETORETEN As String,
                                      ByVal p_TRIBUTAC_SOLES As String, ByVal p_TRIBUTAC_CTA_DETRA As String, ByVal p_TRANSPOR_VEHICULO As String,
                                      ByVal p_TRANSPOR_CERT_INSCR As String, ByVal p_TRANSPOR_CHOFER As String, ByVal p_TRANSPOR_LICENCIA As String,
                                      ByVal p_CONTACTO As String, ByVal p_COMPRADOR As String, ByVal p_PROVEDOR_TIPODOC As String, ByVal p_TRANSPORTISTA_TIPODOC As String,
                                      ByVal p_GLOSA_GENERAL As String, ByVal p_COMPLETO_IND As String, ByVal p_INCLU_IGV As String, ByVal p_AUTOGENERADO As String, ByVal p_RESPONSABLE As String, ByVal p_SOCOTI_CODE As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_ORD_COMPRA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_REGIS", p_DOC_REGIS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_REGIS_NRO", p_DOC_REGIS_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLEC", p_ESTABLEC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROVEDOR", p_PROVEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSAC", Convert.ToDateTime(p_FECHA_TRANSAC).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", Convert.ToDateTime(p_FECHA_EMISION).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIG", p_DOC_ORIG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIG_NRO", p_DOC_ORIG_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESPACHO", p_DESPACHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGA", p_ENTREGA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPORTISTA", p_TRANSPORTISTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRANSPOR", p_TIPO_TRANSPOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODO_PAGO", p_MODO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAZO_PAGO", p_PLAZO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHAV_PAGO", Convert.ToDateTime(p_FECHAV_PAGO).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_PAGO", p_ESTADO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_MONEDA", p_MONETAR_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_BASE_IMP", p_MONETAR_BASE_IMP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_DESCUENTO", p_MONETAR_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_ISC", p_MONETAR_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_SUBTOTAL", p_MONETAR_SUBTOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_IGVPOR", p_MONETAR_IGVPOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_IGVSOL", p_MONETAR_IGVSOL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_AJUST", p_MONETAR_AJUST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PREC_TOTAL", p_MONETAR_PREC_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_DETRACCION", p_MONETAR_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PERCEPCION", p_MONETAR_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_RETENCION", p_MONETAR_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PAGAR", p_MONETAR_PAGAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETODETRA", p_TRIBUTAC_SUJETODETRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETOPERS", p_TRIBUTAC_SUJETOPERS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETORETEN", p_TRIBUTAC_SUJETORETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SOLES", p_TRIBUTAC_SOLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_CTA_DETRA", p_TRIBUTAC_CTA_DETRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_VEHICULO", p_TRANSPOR_VEHICULO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_CERT_INSCR", p_TRANSPOR_CERT_INSCR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_CHOFER", p_TRANSPOR_CHOFER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_LICENCIA", p_TRANSPOR_LICENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONTACTO", p_CONTACTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRADOR", p_COMPRADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROVEDOR_TIPODOC", p_PROVEDOR_TIPODOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPORTISTA_TIPODOC", p_TRANSPORTISTA_TIPODOC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA_GENERAL", p_GLOSA_GENERAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_INCLU_IGV", p_INCLU_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTOGENERADO", p_AUTOGENERADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPONSABLE", p_RESPONSABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SOCOTI_CODE", p_SOCOTI_CODE, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_CODESALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CORRELATIVO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODESALIDA").Value
            msg(1) = "OK"
            msg(2) = cmd.Parameters("@p_CORRELATIVO").Value
            'msg = cmd1.Parameters("@p_CODESALIDA").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function COMPLETAR_ORDEN_COMPRA(
                                      ByVal p_CODIGO As String, ByVal p_DOC_REGIS As String, ByVal p_DOC_REGIS_NRO As String, ByVal p_CATALOGO As String,
                                      ByVal p_ESTABLEC As String, ByVal p_PROVEDOR As String, ByVal p_FECHA_TRANSAC As String,
                                      ByVal p_FECHA_EMISION As String, ByVal p_DOC_ORIG As String, ByVal p_DOC_ORIG_NRO As String,
                                      ByVal p_DESPACHO As String, ByVal p_ENTREGA As String, ByVal p_TRANSPORTISTA As String,
                                      ByVal p_TIPO_TRANSPOR As String, ByVal p_MODO_PAGO As String, ByVal p_PLAZO_PAGO As Integer,
                                      ByVal p_FECHAV_PAGO As String, ByVal p_ESTADO_PAGO As String, ByVal p_MONETAR_MONEDA As String,
                                      ByVal p_MONETAR_BASE_IMP As Decimal, ByVal p_MONETAR_DESCUENTO As Decimal, ByVal p_MONETAR_ISC As Decimal,
                                      ByVal p_MONETAR_SUBTOTAL As Decimal, ByVal p_MONETAR_IGVPOR As Decimal, ByVal p_MONETAR_IGVSOL As Decimal,
                                      ByVal p_MONETAR_AJUST As Decimal, ByVal p_MONETAR_PREC_TOTAL As Decimal, ByVal p_MONETAR_DETRACCION As Decimal,
                                      ByVal p_MONETAR_PERCEPCION As Decimal, ByVal p_MONETAR_RETENCION As Decimal, ByVal p_MONETAR_PAGAR As Decimal,
                                      ByVal p_TRIBUTAC_SUJETODETRA As String, ByVal p_TRIBUTAC_SUJETOPERS As String, ByVal p_TRIBUTAC_SUJETORETEN As String,
                                      ByVal p_TRIBUTAC_SOLES As String, ByVal p_TRIBUTAC_CTA_DETRA As String, ByVal p_TRANSPOR_VEHICULO As String,
                                      ByVal p_TRANSPOR_CERT_INSCR As String, ByVal p_TRANSPOR_CHOFER As String, ByVal p_TRANSPOR_LICENCIA As String,
                                      ByVal p_CONTACTO As String, ByVal p_COMPRADOR As String, ByVal p_PROVEDOR_TIPODOC As String, ByVal p_TRANSPORTISTA_TIPODOC As String,
                                      ByVal p_GLOSA_GENERAL As String, ByVal p_COMPLETO_IND As String, ByVal p_INCLU_IGV As String, ByVal p_AUTOGENERADO As String, ByVal p_RESPONSABLE As String, ByVal p_SOCOTI_CODE As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_COMPLETAR_ORD_COMPRA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_REGIS", p_DOC_REGIS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_REGIS_NRO", p_DOC_REGIS_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLEC", p_ESTABLEC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROVEDOR", p_PROVEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSAC", Convert.ToDateTime(p_FECHA_TRANSAC).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", Convert.ToDateTime(p_FECHA_EMISION).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIG", p_DOC_ORIG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIG_NRO", p_DOC_ORIG_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESPACHO", p_DESPACHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGA", p_ENTREGA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPORTISTA", p_TRANSPORTISTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRANSPOR", p_TIPO_TRANSPOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODO_PAGO", p_MODO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAZO_PAGO", p_PLAZO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHAV_PAGO", Convert.ToDateTime(p_FECHAV_PAGO).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_PAGO", p_ESTADO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_MONEDA", p_MONETAR_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_BASE_IMP", p_MONETAR_BASE_IMP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_DESCUENTO", p_MONETAR_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_ISC", p_MONETAR_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_SUBTOTAL", p_MONETAR_SUBTOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_IGVPOR", p_MONETAR_IGVPOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_IGVSOL", p_MONETAR_IGVSOL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_AJUST", p_MONETAR_AJUST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PREC_TOTAL", p_MONETAR_PREC_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_DETRACCION", p_MONETAR_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PERCEPCION", p_MONETAR_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_RETENCION", p_MONETAR_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PAGAR", p_MONETAR_PAGAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETODETRA", p_TRIBUTAC_SUJETODETRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETOPERS", p_TRIBUTAC_SUJETOPERS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETORETEN", p_TRIBUTAC_SUJETORETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SOLES", p_TRIBUTAC_SOLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_CTA_DETRA", p_TRIBUTAC_CTA_DETRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_VEHICULO", p_TRANSPOR_VEHICULO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_CERT_INSCR", p_TRANSPOR_CERT_INSCR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_CHOFER", p_TRANSPOR_CHOFER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_LICENCIA", p_TRANSPOR_LICENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONTACTO", p_CONTACTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRADOR", p_COMPRADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROVEDOR_TIPODOC", p_PROVEDOR_TIPODOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPORTISTA_TIPODOC", p_TRANSPORTISTA_TIPODOC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA_GENERAL", p_GLOSA_GENERAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPLETO_IND", p_COMPLETO_IND, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_INCLU_IGV", p_INCLU_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTOGENERADO", p_AUTOGENERADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPONSABLE", p_RESPONSABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SOCOTI_CODE", p_SOCOTI_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))


            cmd.Parameters.Add(cn.GetNewParameter("@p_CODESALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CORRELATIVO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd.Parameters("@p_CODESALIDA").Value
            msg(1) = "OK"
            msg(2) = cmd.Parameters("@p_CORRELATIVO").Value
            'msg = cmd1.Parameters("@p_CODESALIDA").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function MODIFICAR_ORDEN_COMPRA(
                                      ByVal p_CODIGO As String, ByVal p_DOC_REGIS As String, ByVal p_DOC_REGIS_NRO As String, ByVal p_CATALOGO As String,
                                      ByVal p_ESTABLEC As String, ByVal p_PROVEDOR As String, ByVal p_FECHA_TRANSAC As String,
                                      ByVal p_FECHA_EMISION As String, ByVal p_DOC_ORIG As String, ByVal p_DOC_ORIG_NRO As String,
                                      ByVal p_DESPACHO As String, ByVal p_ENTREGA As String, ByVal p_TRANSPORTISTA As String,
                                      ByVal p_TIPO_TRANSPOR As String, ByVal p_MODO_PAGO As String, ByVal p_PLAZO_PAGO As Integer,
                                      ByVal p_FECHAV_PAGO As String, ByVal p_ESTADO_PAGO As String, ByVal p_MONETAR_MONEDA As String,
                                      ByVal p_MONETAR_BASE_IMP As Decimal, ByVal p_MONETAR_DESCUENTO As Decimal, ByVal p_MONETAR_ISC As Decimal,
                                      ByVal p_MONETAR_SUBTOTAL As Decimal, ByVal p_MONETAR_IGVPOR As Decimal, ByVal p_MONETAR_IGVSOL As Decimal,
                                      ByVal p_MONETAR_AJUST As Decimal, ByVal p_MONETAR_PREC_TOTAL As Decimal, ByVal p_MONETAR_DETRACCION As Decimal,
                                      ByVal p_MONETAR_PERCEPCION As Decimal, ByVal p_MONETAR_RETENCION As Decimal, ByVal p_MONETAR_PAGAR As Decimal,
                                      ByVal p_TRIBUTAC_SUJETODETRA As String, ByVal p_TRIBUTAC_SUJETOPERS As String, ByVal p_TRIBUTAC_SUJETORETEN As String,
                                      ByVal p_TRIBUTAC_SOLES As String, ByVal p_TRIBUTAC_CTA_DETRA As String, ByVal p_TRANSPOR_VEHICULO As String,
                                      ByVal p_TRANSPOR_CERT_INSCR As String, ByVal p_TRANSPOR_CHOFER As String, ByVal p_TRANSPOR_LICENCIA As String,
                                      ByVal p_CONTACTO As String, ByVal p_COMPRADOR As String, ByVal p_PROVEDOR_TIPODOC As String, ByVal p_TRANSPORTISTA_TIPODOC As String,
                                      ByVal p_GLOSA_GENERAL As String, ByVal p_INCLU_IGV As String, ByVal p_AUTOGENERADO As String, ByVal p_RESPONSABLE As String, ByVal p_SOCOTI_CODE As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_MODIFICAR_ORD_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_REGIS", p_DOC_REGIS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_REGIS_NRO", p_DOC_REGIS_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLEC", p_ESTABLEC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROVEDOR", p_PROVEDOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRANSAC", Convert.ToDateTime(p_FECHA_TRANSAC).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION", Convert.ToDateTime(p_FECHA_EMISION).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIG", p_DOC_ORIG, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DOC_ORIG_NRO", p_DOC_ORIG_NRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESPACHO", p_DESPACHO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTREGA", p_ENTREGA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPORTISTA", p_TRANSPORTISTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRANSPOR", p_TIPO_TRANSPOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MODO_PAGO", p_MODO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PLAZO_PAGO", p_PLAZO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHAV_PAGO", Convert.ToDateTime(p_FECHAV_PAGO).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_PAGO", p_ESTADO_PAGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_MONEDA", p_MONETAR_MONEDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_BASE_IMP", p_MONETAR_BASE_IMP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_DESCUENTO", p_MONETAR_DESCUENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_ISC", p_MONETAR_ISC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_SUBTOTAL", p_MONETAR_SUBTOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_IGVPOR", p_MONETAR_IGVPOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_IGVSOL", p_MONETAR_IGVSOL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_AJUST", p_MONETAR_AJUST, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PREC_TOTAL", p_MONETAR_PREC_TOTAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_DETRACCION", p_MONETAR_DETRACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PERCEPCION", p_MONETAR_PERCEPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_RETENCION", p_MONETAR_RETENCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MONETAR_PAGAR", p_MONETAR_PAGAR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETODETRA", p_TRIBUTAC_SUJETODETRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETOPERS", p_TRIBUTAC_SUJETOPERS, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SUJETORETEN", p_TRIBUTAC_SUJETORETEN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_SOLES", p_TRIBUTAC_SOLES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRIBUTAC_CTA_DETRA", p_TRIBUTAC_CTA_DETRA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_VEHICULO", p_TRANSPOR_VEHICULO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_CERT_INSCR", p_TRANSPOR_CERT_INSCR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_CHOFER", p_TRANSPOR_CHOFER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPOR_LICENCIA", p_TRANSPOR_LICENCIA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONTACTO", p_CONTACTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COMPRADOR", p_COMPRADOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROVEDOR_TIPODOC", p_PROVEDOR_TIPODOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TRANSPORTISTA_TIPODOC", p_TRANSPORTISTA_TIPODOC, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA_GENERAL", p_GLOSA_GENERAL, ParameterDirection.Input, 253))



            cmd.Parameters.Add(cn.GetNewParameter("@p_INCLU_IGV", p_INCLU_IGV, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_AUTOGENERADO", p_AUTOGENERADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPONSABLE", p_RESPONSABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SOCOTI_CODE", p_SOCOTI_CODE, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = "OK"
            'msg = cmd1.Parameters("@p_CODESALIDA").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    '-----------------------
    Public Function APROBACION_DETALLE_REQUE_COMPRA(ByVal P_TEXT As String, ByVal tipoRequerimiento As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_APRO_DETALL_REQ", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", P_TEXT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_tipoReq", tipoRequerimiento, ParameterDirection.Input, 253))

            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function DELETE_DETALLE_REQUE_COMPRA(ByVal p_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_DELETE_DETALLE_REQ", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function MODIFICAR_DETALLE_GLOSA_REQUE_COMPRA(ByVal p_CODE As String, ByVal p_GLOSA As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFB_MODIFICAR_GLOSA_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_USUA_DETALLE_REQCOMPRA(ByVal p_CODE As String, ByVal p_estado As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_DETALLE_REQCOMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_estado, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_USUA_CABECERA_REQUCOMPRA(ByVal p_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_USUA_CABECERA_REQUCOMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_CABECERA_REQUECOMPRA(p_CATALOGO As String, p_ESTABLE As String, p_USUARIO As String, p_SOLICITA As String, p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CABECERA_REQUCOMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLE", p_ESTABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", IIf(p_USUARIO = String.Empty, DBNull.Value, p_USUARIO), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SOLICITA", IIf(p_SOLICITA = 0, DBNull.Value, p_SOLICITA), ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_CABECERA_MIS_REQUECOMPRA(ByVal p_CATALOGO As String, ByVal p_ESTABLE As String,
                                                    ByVal p_USUARIO As String, Optional ByVal p_ESTADO As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CABECERA_MIS_REQUCOMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLE", p_ESTABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUARIO", p_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception

            Throw (ex)
        End Try
    End Function

    Public Function CREAR_DETALLE_REQUE_COMPRA(ByVal p_CODE_CABECERA As String, ByVal p_TXT As String) As String
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_GRABAR_DETALLE_REQUE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT_COMP", p_TXT, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Return "OK"
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CREAR_REQUE_COMPRA(p_SOLICITA As Integer, p_FECHA As String, p_PRIORIDAD As String, p_TIPOREQ As String, p_GLOSA As String,
                                       p_CATALOGO As String, p_ESTABLECIMIENTO As String, p_CECC_CODE As String, p_CECD_CODE As String, p_USUA_ID As String,
                                       Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_CREAR_REQUECOMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_SOLICITA", p_SOLICITA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRIORIDAD", p_PRIORIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPOREQ", p_TIPOREQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLECIMIENTO", p_ESTABLECIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC_CODE", p_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD_CODE", p_CECD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Dim msg As String = cmd.Parameters("@p_CODIGO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function CREAR_MI_REQUE_COMPRA(p_SOLICITA As String, p_FECHA As String, p_PRIORIDAD As String, p_TIPOREQ As String, p_GLOSA As String,
                                       p_CATALOGO As String, p_ESTABLECIMIENTO As String, p_CECC_CODE As String, p_CECD_CODE As String,
                                       Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFB_CREAR_MI_REQUECOMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_SOLICITA", p_SOLICITA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PRIORIDAD", p_PRIORIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPOREQ", p_TIPOREQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GLOSA", p_GLOSA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CATALOGO", p_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTABLECIMIENTO", p_ESTABLECIMIENTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECC_CODE", p_CECC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CECD_CODE", p_CECD_CODE, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Dim msg As String = cmd.Parameters("@p_CODIGO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Sub fnCrearDetalleRequerimiento(p_CODE_PROD As String, p_CANTIDAD As Integer, p_CODE_UNM As String, p_FECHA As String, p_CODE_CABECERA As String,
                                           p_ITEM As Integer, Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)

        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_DETALLE_REQUE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PROD", p_CODE_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD", p_CANTIDAD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_UNM", p_CODE_UNM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_CABECERA", p_CODE_CABECERA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

        Catch ex As Exception
            Throw (ex)
        End Try
    End Sub

    Public Function ListarRegistroCompras_Libro8(ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_REGISTRO_COMPRAS_LIBRO_8", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarRegistroVentas_sunat(ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_REGISTRO_VENTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarRegistroVentas_sire(ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_RUC As String, ByVal p_DESC_EMPRESA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_REGISTRO_VENTAS_SIRE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUC", p_RUC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_EMPRESA", p_DESC_EMPRESA, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarRegistroCompras_sire(ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_RUC As String, ByVal p_DESC_EMPRESA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCA_LISTAR_REGISTRO_COMPRAS_SIRE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RUC", p_RUC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC_EMPRESA", p_DESC_EMPRESA, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarComprobantes_Masivo(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DESDE As String, ByVal p_HASTA As String, ByVal p_PIDM As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_LISTA_COMPROBANTES_ELECT_MASIVO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", p_DESDE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", p_HASTA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PIDM", p_PIDM, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Req_Usua_Detalle(ByVal p_CODE_REQ As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_FECHA As String, ByVal p_ESTADO_IND As String, ByVal p_ESTADO_APRO As String, ByVal p_CODE_PROD As String, ByVal p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_REQ_AREA_USUA_DETALLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REQ", p_CODE_REQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_APRO", p_ESTADO_APRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PROD", p_CODE_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Req_Usua_Servicio(ByVal p_CODE_REQ As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_FECHA As String, ByVal p_ESTADO_IND As String, ByVal p_ESTADO_APRO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_REQ_AREA_USUA_SERVICIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REQ", p_CODE_REQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA", p_FECHA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_APRO", p_ESTADO_APRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_REQ", String.Empty, ParameterDirection.Output, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Req_Compra(ByVal p_COD_PRODUCTO As String, ByVal p_COD_REQ_AREA As String, ByVal p_ITEM As String, ByVal p_CANTIDAD_DESPACHADA As String, P_CANTIDAD_PEDIDA As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_CANT_DESPACHADA_ANTERIOR As String, ByVal p_IND_REQ_COMPLETADO As String) As Array

        Try

            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_REQ_COMPRA_ALMC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_PRODUCTO", p_COD_PRODUCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_REQ_AREA", p_COD_REQ_AREA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ITEM", p_ITEM, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_DESPACHADA", p_CANTIDAD_DESPACHADA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD_PEDIDA", P_CANTIDAD_PEDIDA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANT_DESPACHADA_ANTERIOR", p_CANT_DESPACHADA_ANTERIOR, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND_REQ_COMPLETADO", p_IND_REQ_COMPLETADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_STOCK_REAL", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_PED", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CANTIDAD_DES", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_STOCK_REAL").Value
            msg(1) = cmd1.Parameters("@p_CANTIDAD_PED").Value
            msg(2) = cmd1.Parameters("@p_CANTIDAD_DES").Value
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_Salidas_Almacen(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DATA As String, ByVal p_CODE_REQ As String, ByVal p_USUA_ID As String) As String

        Try


            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREA_SALIDAS_ALMACEN", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DATA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REQ", p_CODE_REQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Return ""

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_req_compra(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_DATA As String, ByVal p_NOMBRE_REQ As String, ByVal p_FECHA_TRAN As String, ByVal p_USUA_ID As String) As String

        Try


            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CREAR_DETALLE_REQUERIMIENTO_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE", p_DATA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_NOMBRE_REQ", p_NOMBRE_REQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_TRAN", p_FECHA_TRAN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Return cmd.Parameters("@p_CODIGO").Value

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_DETALLES_APROBADOS(ByVal p_REC_CODE As String, ByVal p_PROD_CODE As String, Optional p_SCSL_CODE As String = "", Optional p_CTLG_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand = cn.GetNewCommand("PFT_LISTADO_RECPROD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_REC_CODE", p_REC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_DETALLES_APROBADOS_REQUE(ByVal p_REC_CODE As String, ByVal p_PROD_CODE As String, Optional p_SCSL_CODE As String = "", Optional p_CTLG_CODE As String = "") As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand = cn.GetNewCommand("PFT_LISTADO_RECPROD_REQUE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_REC_CODE", p_REC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Req_compra_detalle(ByVal p_CODE_REQ As String, ByVal p_ESTADO As String, ByVal p_CODE_PROD As String, ByVal p_TIPO As String, ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ESTADO_COTI As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PFC_LISTAR_REQ_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_REQ", p_CODE_REQ, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE_PROD", p_CODE_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_COTI", p_ESTADO_COTI, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Devuelve_Stock_Producto(ByVal p_SCSL_CODE As String, ByVal p_CTLG_CODE As String, ByVal p_PROD_CODE As String, ByVal p_TIPO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PCS_DEVUELVE_STOCK_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
          
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function Cancelar_Orden_compra(ByVal p_COD_ORD As String, ByVal p_DETALLE_ORD As String) As String

        Try


            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CANCELAR_ORD_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_ORD", p_COD_ORD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLE_ORD", p_DETALLE_ORD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Return cmd.Parameters("@p_RESP").Value

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Cancelar_deuda_Orden_compra(ByVal p_COD_ORD As String) As String

        Try


            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_CANCELAR_DEUDA_ORD_COMPRA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_ORD", p_COD_ORD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SALIDA", String.Empty, ParameterDirection.Output, 253))
            cmd = cn.Ejecuta_parms(cmd)

            Return cmd.Parameters("@p_SALIDA").Value

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Listar_Registro_Compras(ByVal p_CTLG_CODE As String, ByVal p_SCSL_CODE As String, ByVal p_ANIO As String, ByVal p_MES As String, ByVal p_FECHA_EMISION_DESDE As String, ByVal p_FECHA_REGISTRO_DESDE As String, ByVal p_FECHA_REGISTRO_HASTA As String, ByVal p_FECHA_EMISION_HASTA As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand


            cmd = cn.GetNewCommand("PCA_LISTAR_PRE_REGISTRO_COMPRAS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANIO", p_ANIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MES", p_MES, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_DESDE", IIf(p_FECHA_EMISION_DESDE = "", DBNull.Value, p_FECHA_EMISION_DESDE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REGISTRO_DESDE", IIf(p_FECHA_REGISTRO_DESDE = "", DBNull.Value, p_FECHA_REGISTRO_DESDE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_REGISTRO_HASTA", IIf(p_FECHA_REGISTRO_HASTA = "", DBNull.Value, p_FECHA_REGISTRO_HASTA), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FECHA_EMISION_HASTA", IIf(p_FECHA_EMISION_HASTA = "", DBNull.Value, p_FECHA_EMISION_HASTA), ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_detalle_registro_compras(ByVal P_DOC_CODE As String, ByVal P_COLUMNA As String, ByVal P_VALOR As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCA_ACTUALIZAR_DETALLE_REGISTRO_COMPRAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_DOC_CODE", P_DOC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COLUMNA", P_COLUMNA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR", P_VALOR, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function actualizar_detalle_codigo_opera(ByVal P_DOC_CODE As String, ByVal P_COLUMNA As String, ByVal P_VALOR As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PCA_ACTUALIZAR_REGISTRO_OPERA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_DOC_CODE", P_DOC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COLUMNA", P_COLUMNA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_VALOR", P_VALOR, ParameterDirection.Input, 253))
            cmd = cn.Ejecuta_parms(cmd)
            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Eliminar_Req_Compra(P_ACCION As String, p_CTLG_CODE As String, p_SCSL_CODE As String, P_COD_PRODUCTO As String, P_CANTIDAD As Integer) As String

        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand
            cmd = cn.GetNewCommand("PFC_ELIMINAR_REQ_COMPRA_ALMC", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_ACCION", P_ACCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_COD_PRODUCTO", P_COD_PRODUCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CANTIDAD", P_CANTIDAD, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "OK"
            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function




End Class




