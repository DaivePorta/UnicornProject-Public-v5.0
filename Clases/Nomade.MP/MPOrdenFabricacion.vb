Public Class MPOrdenFabricacion

    Private cn As Nomade.Connection
    Dim dt As DataTable

    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function CREAR_DETALLE_ALMACEN(ByVal P_CODE As String, ByVal P_TEXT As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFS_CREAR_DETALLE_ALMACEN", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT", P_TEXT, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "ok"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_DETALLE_CIERRE_PROD(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_LISTAR_DETALLE_CIERRE_PROD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Crear_salida_ordenFabr(ByVal P_TEXT As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_CREAR_DETALLE_SALIDA_FABRICACION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXT_COMP", P_TEXT, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "ok"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function
    Public Function DEVULVE_PIDM_USUARIO(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("DEVULVE_PIDM_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUARIO", P_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CORREO_JEFE_PRODUCCION(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_CORREO_JEFE_PRODUCCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearCierre(ByVal P_CODE_ORDEN As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_CREATE_CIERRE_LOTE", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_PARAMTRO", P_CODE_ORDEN, ParameterDirection.Input, 253))


            cmd1 = cn.Ejecuta_parms(cmd)
            msg = "ok"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function FTV_LISTAR_CIERRE_PRODUCCION(ByVal P_CODE As String, ByVal P_PRODUCTO As String, ByVal P_TIPO As String, ByVal P_FECHAINI As Date, ByVal P_FECHAFIN As Date) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_LISTAR_CIERRE_PRODUCCION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PRODUCTO", P_PRODUCTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO", P_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHAINI", Convert.ToDateTime(P_FECHAINI).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHAFIN", Convert.ToDateTime(P_FECHAFIN).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function LISTAR_LOTE_FABRICACION(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_LISTA_ORDEN_LOTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_FABRICA", P_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function listarDetalleOrdenfabri(ByVal P_CODE As String, ByVal P_CODE_ORFLUJO As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_DETALLE_ORD_FABRICACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_ORFLUJO", P_CODE_ORFLUJO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function BUSCAR_DETALLE_FLUJO_SOLICITUD(ByVal P_CODE As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_BUSCAR_DETALLE_FLUJO_SOLICITUD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODE, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function BUSCAR_FLUJO_SOLICITUD(ByVal P_CODE As String, ByVal P_CODE_PROD As String, ByVal FECHA_INI As Date, ByVal FECHA_FIN As Date, ByVal TIPO As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_BUSCAR_FLUJO_SOLICITUD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_PROD", P_CODE_PROD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@FECHA_INI", Convert.ToDateTime(FECHA_INI).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@FECHA_FIN", Convert.ToDateTime(FECHA_FIN).ToString("yyyy/MM/dd"), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@TIPO", TIPO, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarOrdenFabricacion(ByVal P_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, ByVal P_PIDM_RESPONSABLE As String, ByVal P_TIPO_FABRICACION As String, ByVal P_ESTADO_IND As String, Optional P_CODE_ORDEN As String = "") As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_LISTAR_ORD_FABRICACION", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE", P_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PIDM_RESPONSABLE", P_PIDM_RESPONSABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_FABRICACION", P_TIPO_FABRICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO_IND", P_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODE_ORDEN", P_CODE_ORDEN, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearOrdenFabricacion(ByVal P_FECHA_REGISTRO As String, ByVal P_DESCRIPCION As String, ByVal P_ESTADO As String,
                                          ByVal P_FABRICACION As String, ByVal P_RESPONSABLE As String, ByVal P_TEXT As String,
                                          ByVal P_CATALOGO As String, ByVal P_SUCURSAL As String) As String
        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("FTV_CREAR_ORD_FABRICACION", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@P_FECHA_REGISTRO", P_FECHA_REGISTRO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DESCRIPCION", P_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_FABRICACION", P_FABRICACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_RESPONSABLE", P_RESPONSABLE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TEXT", P_TEXT, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CATALOGO", P_CATALOGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SUCURSAL", P_SUCURSAL, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@P_CODIGO").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarFormulacionProducto(ByVal p_ctlg As String, ByVal p_prod As String, ByVal p_cantidad As String) As DataTable

        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_formProducto", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_ctlg", p_ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_prodcode", p_prod, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cantidad", p_cantidad, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListaCabeceraFormulacion(ByVal p_Producto As String, ByVal p_Cant As String, ByVal p_catalogo As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_formCabecera", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_producto", p_Producto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_cant", p_Cant, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_catalogo", p_catalogo, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarDetalleFormulacion(ByVal p_Cantidad As Double, ByVal p_Ctlg As String, ByVal p_Producto As String, ByVal p_almacen As String) As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_formDetalle", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_Cantidad", p_Cantidad, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Ctlg", p_Ctlg, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_Producto", p_Producto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_almacen", p_almacen, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarEtapasProduccion() As DataTable
        Try
            Dim dt As DataTable = Nothing
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("sp_ListaEtapasProduccion", CommandType.StoredProcedure)
            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarEmpleadosActivos()
        Try
            Dim dt As DataTable = Nothing

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_EMPLEADO_CONTRATO_ACTIVO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", "", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", "", ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ListarCargos()
        Try
            Dim dt As DataTable = Nothing

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PPP_LISTAR_CARGO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", "", ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", "", ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function SEL_MailProduccion(ByVal pCode As String)
        Try
            Dim dt As DataTable = Nothing

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_SEL_MAILPROD", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", pCode, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function MOD_MailProduccion(ByVal pCode As String, _
                                      ByVal pTipo As String, _
                                      ByVal pCargCode As String, _
                                      ByVal pPIDM As String, _
                                      ByVal pGlosa As String, _
                                      ByVal pEtapa As String) As String
        Dim Email As String = String.Empty
        Dim dt As DataTable
        Dim n As Integer = 0

        Try
            Dim msg As String

            Dim cmd, cmd1 As IDbCommand


            If pTipo = "CA" Then
                dt = fListarEmailCargo(pCargCode)
                If Not dt Is Nothing Then
                    For Each nrow As DataRow In dt.Rows
                        If n = 0 Then
                            Email = Email & nrow("PPRCORR_CORREO").ToString
                        Else
                            Email = Email & "," & nrow("PPRCORR_CORREO").ToString
                        End If
                        n = n + 1
                    Next
                End If
            Else

                dt = fListarEmailPIDM(pPIDM)
                If Not dt Is Nothing Then
                    For Each nrow As DataRow In dt.Rows
                        If n = 0 Then
                            Email = Email & nrow("PPRCORR_CORREO").ToString
                        Else
                            Email = Email & "," & nrow("PPRCORR_CORREO").ToString
                        End If
                    Next
                End If
            End If

                cmd = cn.GetNewCommand("SP_MOD_MAILPROD", CommandType.StoredProcedure)

                cmd.Parameters.Add(cn.GetNewParameter("@pTipo", pTipo, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pCargCode", pCargCode, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pPIDM", pPIDM, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pGlosa", pGlosa, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pEtapa", pEtapa, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pCorreo", Email, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pCODE", pCode, ParameterDirection.Input, 253))

                cmd1 = cn.Ejecuta_parms(cmd)
                msg = "OK"


                Return msg
        Catch ex As Exception
            Throw ex
        End Try

    End Function


    Public Function Ins_MailProduccion(ByVal pTipo As String, _
                                       ByVal pCargCode As String, _
                                       ByVal pPIDM As String, _
                                       ByVal pGlosa As String, _
                                       ByVal pEtapa As String) As String
        Dim Email As String = String.Empty
        Dim dt As DataTable
        Dim n As Integer = 0

        Try
            Dim msg As String

            Dim cmd, cmd1 As IDbCommand


            If pTipo = "CA" Then
                dt = fListarEmailCargo(pCargCode)
                If Not dt Is Nothing Then
                    For Each nrow As DataRow In dt.Rows
                        If n = 0 Then
                            Email = Email & nrow("PPRCORR_CORREO").ToString
                        Else
                            Email = Email & "," & nrow("PPRCORR_CORREO").ToString
                        End If
                        n = n + 1
                    Next
                End If
            Else

                dt = fListarEmailPIDM(pPIDM)
                If Not dt Is Nothing Then
                    For Each nrow As DataRow In dt.Rows
                        If n = 0 Then
                            Email = Email & nrow("PPRCORR_CORREO").ToString
                        Else
                            Email = Email & "," & nrow("PPRCORR_CORREO").ToString
                        End If
                    Next
                End If
            End If

                cmd = cn.GetNewCommand("SP_INS_MAILPROD", CommandType.StoredProcedure)

                cmd.Parameters.Add(cn.GetNewParameter("@pTipo", pTipo, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pCargCode", pCargCode, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pPIDM", pPIDM, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pGlosa", pGlosa, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pEtapa", pEtapa, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pCorreo", Email, ParameterDirection.Input, 253))
                cmd.Parameters.Add(cn.GetNewParameter("@pCODE", String.Empty, ParameterDirection.Output, 253))

                cmd1 = cn.Ejecuta_parms(cmd)
                msg = cmd1.Parameters("@pCODE").Value


                Return msg
        Catch ex As Exception
            Throw ex
        End Try

    End Function

    Public Function fListarEmailCargo(ByVal pCodCarg As String) As DataTable
        Dim dt As DataTable = Nothing
        Try


            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_EmailEmpCarg", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@pCodCarg", pCodCarg, ParameterDirection.Input, 253))            
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function


    Public Function fListarEmailPIDM(ByVal pPIDM As String) As DataTable
        Dim dt As DataTable = Nothing
        Try


            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SP_MAILPIDM", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@pPIDM", pPIDM, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function

    Public Function ObtenerInicioNomenclaturaOrdenLote(ByVal P_REGEXP As String) As DataTable
        Dim dt As DataTable = Nothing
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("FTV_OBTENER_INICIO_NOMENCLATURA_ORDEN_LOTE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_REGEXP", P_REGEXP, ParameterDirection.Input, 253))
            dt = cn.Consulta(cmd)

            Return dt

        Catch ex As Exception
            Throw ex
        End Try
    End Function
End Class
